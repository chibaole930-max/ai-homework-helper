import asyncio
import json
import shutil
import subprocess
from datetime import datetime
from pathlib import Path
from .config import Config


class CodeUpdater:
    def __init__(self):
        self.repo_path = Config.REPO_PATH
        self.package_json = Path(self.repo_path) / "package.json"
        self.backup_dir = Path(self.repo_path) / ".auto-update-backups"

    async def create_branch(self) -> str:
        git = shutil.which("git") or "git"
        timestamp = datetime.now().strftime("%Y-%m-%d-%H%M")
        branch_name = f"auto-update/{timestamp}"
        await self._run_command([git, "-C", self.repo_path, "checkout", "-b", branch_name])
        return branch_name

    async def backup_file(self, file_path: str) -> str | None:
        """Backup a file before modifying."""
        src = Path(self.repo_path) / file_path
        if not src.exists():
            return None

        self.backup_dir.mkdir(parents=True, exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        backup_name = f"{file_path.replace('/', '_').replace('\\', '_')}.{timestamp}.bak"
        dst = self.backup_dir / backup_name
        shutil.copy2(src, dst)
        return str(dst)

    async def update_dependencies(self, updates: list) -> list:
        changes = []

        if not self.package_json.exists():
            return changes

        backup = await self.backup_file("package.json")

        with open(self.package_json, "r", encoding="utf-8") as f:
            pkg = json.load(f)

        for update in updates:
            if not update.get("version"):
                continue

            pkg_name = update["package"]
            new_version = update["version"].lstrip("^")

            for dep_type in ["dependencies", "devDependencies"]:
                if dep_type in pkg and pkg_name in pkg[dep_type]:
                    old_version = pkg[dep_type][pkg_name]
                    pkg[dep_type][pkg_name] = f"^{new_version}"
                    changes.append({
                        "file": "package.json",
                        "desc": f"Update {pkg_name}: {old_version} → ^{new_version}"
                    })

        if changes:
            with open(self.package_json, "w", encoding="utf-8") as f:
                json.dump(pkg, f, indent=2, ensure_ascii=False)

        return changes

    async def run_opencode_task(self, prompt: str, timeout: int = 300) -> str:
        """Run OpenCode CLI to perform a code task using build agent."""
        try:
            opencode_bin = shutil.which("opencode") or "opencode"
            cmd = [
                opencode_bin, "run",
                "--agent", "build",
                "--model", Config.OPENCODE_MODEL,
                prompt,
            ]
            proc = await asyncio.create_subprocess_exec(
                *cmd,
                cwd=self.repo_path,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            try:
                stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
                output = stdout.decode(errors="ignore")
                if proc.returncode != 0:
                    raise Exception(f"OpenCode failed: {stderr.decode(errors='ignore')}")
                return output
            except asyncio.TimeoutError:
                proc.kill()
                raise Exception(f"OpenCode task timed out after {timeout}s")
        except FileNotFoundError:
            raise Exception("opencode CLI not found in PATH")

    async def run_tests(self) -> bool:
        try:
            npm = shutil.which("npm") or "npm"
            await self._run_command([npm, "install"])
            build_ok = await self._run_command([npm, "run", "build"])
            if not build_ok:
                return False

            await self._run_command([npm, "run", "lint"])
            return True
        except Exception as e:
            print(f"[Updater] Test failed: {e}")
            await self._log(f"Test failed: {e}")
            return False

    async def commit_and_merge(self, branch: str, changes: list):
        git = shutil.which("git") or "git"
        await self._run_git([git, "add", "."])

        commit_msg = f"auto-update: {len(changes)} updates"
        await self._run_git([git, "commit", "-m", commit_msg])
        await self._run_git([git, "checkout", "main"])
        await self._run_git([git, "merge", branch, "--no-ff", "-m", commit_msg])
        await self._run_git([git, "branch", "-d", branch])

    async def rollback(self, branch: str):
        git = shutil.which("git") or "git"
        try:
            await self._run_git([git, "checkout", "main"])
            await self._run_git([git, "branch", "-D", branch])

            if self.backup_dir.exists():
                for backup in self.backup_dir.glob("*.bak"):
                    original_name = backup.name.split(".")[0].replace("_", "/")
                    src = Path(self.repo_path) / original_name
                    if src.exists():
                        shutil.copy2(backup, src)
        except Exception as e:
            await self._log(f"Rollback error: {e}")

    async def get_current_deps(self) -> dict:
        if not self.package_json.exists():
            return {}

        with open(self.package_json, "r", encoding="utf-8") as f:
            pkg = json.load(f)

        deps = {}
        for dep_type in ["dependencies", "devDependencies"]:
            if dep_type in pkg:
                deps.update(pkg[dep_type])
        return deps

    async def _run_git(self, args: list):
        cmd = ["git", "-C", self.repo_path] + args
        await self._run_command(cmd)

    async def _run_command(self, cmd: list) -> bool:
        try:
            if cmd and cmd[0] in ("npm", "node", "git", "opencode"):
                cmd[0] = shutil.which(cmd[0]) or cmd[0]
                if cmd[0].endswith("npm.cmd") and not cmd[0].endswith(".exe"):
                    pass
            proc = await asyncio.create_subprocess_exec(
                *cmd,
                cwd=self.repo_path,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            stdout, stderr = await proc.communicate()

            if proc.returncode != 0:
                err = stderr.decode(errors="ignore")
                await self._log(f"Command failed: {' '.join(cmd)}\n{err}")
                return False
            return True
        except Exception as e:
            await self._log(f"Command error: {e}")
            return False

    async def _log(self, msg: str):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] {msg}\n"
        try:
            with open(Config.LOG_FILE, "a", encoding="utf-8") as f:
                f.write(log_entry)
        except Exception:
            print(log_entry.strip())