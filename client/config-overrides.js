const { paths } = require("react-app-rewired");
const path = require("path");

module.exports = (config, env) => {
    config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, `${paths.appSrc}/`),
        "@app": path.resolve(__dirname, `${paths.appSrc}/app/`),
        "@features": path.resolve(__dirname, `${paths.appSrc}/app/features/`),
        "@http": path.resolve(__dirname, `${paths.appSrc}/app/shared/http/`),
        "@utils": path.resolve(__dirname, `${paths.appSrc}/app/shared/utils/`),
        "@events": path.resolve(__dirname, `${paths.appSrc}/app/shared/events/`)
    };

    return config;
};
