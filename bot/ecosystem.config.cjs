module.exports = {
  apps: [
    {
      name: "opencode-serve",
      script: "opencode",
      args: "serve --hostname 0.0.0.0 --port 4096",
      interpreter: "none",
      cwd: "C:\\Users\\huynh\\Desktop\\web",
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
      watch: false,
      env: {
        OPENCODE_DISABLE_AUTOUPDATE: "1",
      },
    },
  ],
};