module.exports = {
  apps: [
    {
      name: "telegram-bot",
      script: "python",
      args: "-u main.py",
      interpreter: "none",
      cwd: __dirname,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
      watch: false,
    },
  ],
};
