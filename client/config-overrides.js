const { paths } = require("react-app-rewired");
const path = require("path");

module.exports = (config, env) => {
    config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, `${paths.appSrc}/`),
        "@app": path.resolve(__dirname, `${paths.appSrc}/app/`),
        "@features": path.resolve(__dirname, `${paths.appSrc}/app/features`),
        "@utils": path.resolve(__dirname, `${paths.appSrc}/app/shared/utils`),
        "@actions": path.resolve(__dirname, `${paths.appSrc}/app/actions`),
        "@routes": path.resolve(__dirname, `${paths.appSrc}/app/routes`)
    };

    return config;
};
