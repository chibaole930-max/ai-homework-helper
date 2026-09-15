import httpx
import json
from datetime import datetime, timedelta
from pathlib import Path
from .config import Config


class UpdateSearcher:
    def __init__(self):
        self.github_api = "https://api.github.com"
        self.npm_api = "https://registry.npmjs.org"
        self.package_json = Path(Config.REPO_PATH) / "package.json"

    async def search_all(self) -> list:
        results = []
        results.extend(await self._search_github())
        results.extend(await self._search_npm_tracked())
        results.extend(await self._search_npm_elearning())
        results.extend(await self._search_security())
        return results

    async def _search_github(self) -> list:
        results = []
        target_repos = [
            "vitejs/vite",
            "facebook/react",
            "expressjs/express",
            "google-gemini/generative-ai-js",
            "tailwindlabs/tailwindcss",
            "remix-run/react-router",
            "mui/material-ui",
            "pmndrs/zustand",
        ]
        try:
            async with httpx.AsyncClient() as client:
                for repo in target_repos:
                    resp = await client.get(
                        f"{self.github_api}/repos/{repo}/releases/latest",
                        headers={"Accept": "application/vnd.github.v3+json"},
                        timeout=10,
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        results.append({
                            "source": "github",
                            "package": repo.split("/")[-1],
                            "version": (data.get("tag_name") or "").lstrip("v"),
                            "url": data.get("html_url", ""),
                            "published": data.get("published_at", ""),
                            "desc": data.get("name", f"New release for {repo}"),
                        })
        except Exception as e:
            print(f"[Searcher] GitHub search error: {e}")
        return results

    async def _search_npm_tracked(self) -> list:
        return await self._search_npm_packages(Config.TRACKED_PACKAGES)

    async def _search_npm_elearning(self) -> list:
        return await self._search_npm_packages(Config.ELEARNING_PACKAGES)

    async def _search_npm_packages(self, packages: list) -> list:
        results = []
        try:
            async with httpx.AsyncClient() as client:
                for pkg in packages:
                    resp = await client.get(f"{self.npm_api}/{pkg}/latest", timeout=10)
                    if resp.status_code == 200:
                        data = resp.json()
                        results.append({
                            "source": "npm",
                            "package": pkg,
                            "version": data.get("version", ""),
                            "url": f"https://www.npmjs.com/package/{pkg}",
                            "desc": f"Latest {pkg} version",
                        })
        except Exception as e:
            print(f"[Searcher] NPM search error: {e}")
        return results

    async def _search_security(self) -> list:
        results = []
        try:
            async with httpx.AsyncClient() as client:
                resp = await client.get(
                    f"{self.github_api}/advisories",
                    params={"per_page": 15, "sort": "published"},
                    headers={"Accept": "application/vnd.github.v3+json"},
                    timeout=10,
                )
                if resp.status_code == 200:
                    for adv in resp.json()[:8]:
                        pkg_info = adv.get("vulnerabilities", [{}])
                        pkg_name = "unknown"
                        severity = adv.get("severity", "unknown")
                        if pkg_info and isinstance(pkg_info, list):
                            first = pkg_info[0]
                            pkg_name = first.get("package", {}).get("name", "unknown")
                        results.append({
                            "source": "security",
                            "package": pkg_name,
                            "severity": severity,
                            "url": adv.get("html_url", ""),
                            "desc": adv.get("summary", "Security advisory"),
                        })
        except Exception as e:
            print(f"[Searcher] Security search error: {e}")
        return results

    def compare_with_current(self, updates: list, current_deps: dict) -> list:
        new_updates = []
        matched_keys = set()

        for update in updates:
            pkg = update.get("package", "")
            if pkg in matched_keys:
                continue

            for dep_name, dep_version in current_deps.items():
                dep_key = dep_name.split("/")[-1]
                update_key = pkg.split("/")[-1]

                if dep_key == update_key or dep_name == pkg:
                    current_ver = dep_version.lstrip("^~><=")
                    new_ver = update.get("version", "").lstrip("^~><=")

                    if new_ver and current_ver and new_ver != current_ver:
                        try:
                            import re
                            cur_parts = [int(x) for x in re.findall(r"\d+", current_ver)[:3]]
                            new_parts = [int(x) for x in re.findall(r"\d+", new_ver)[:3]]
                            if new_parts > cur_parts:
                                update["package"] = dep_name
                                update["current_version"] = current_ver
                                update["new_version"] = new_ver
                                new_updates.append(update)
                                matched_keys.add(pkg)
                        except Exception:
                            update["package"] = dep_name
                            update["current_version"] = current_ver
                            update["new_version"] = new_ver
                            new_updates.append(update)
                            matched_keys.add(pkg)
                    break

        return new_updates