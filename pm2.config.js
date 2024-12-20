module.exports = {
    apps: [
        {
            name: "sgpms_admin",
            script: "npm",
            args: "run start",
            env: {
                NODE_ENV: "production",
            },
        }
    ],
};
