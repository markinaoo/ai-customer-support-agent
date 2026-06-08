module.exports = {
  apps: [
    {
      name: "ai-growth-link",
      script: "npm",
      args: "run start",
      cwd: __dirname,
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3000"
      }
    }
  ]
};
