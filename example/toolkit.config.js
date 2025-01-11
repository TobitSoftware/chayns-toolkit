const { buildToolkitConfig } = require('chayns-toolkit');

module.exports = buildToolkitConfig({
    development: {
        cert: '//fs1/SSL/tobitag.crt',
        key: '//fs1/SSL/tobitag.key',
        port: process.env.PORT || 8080,
    },
    output: {
        // prefixCss: true,
        // exposeModules: {
        // 	"./AppWrapper": "./src/AppWrapper",
        // },
        entryPoints: {
            index: {
                pathHtml: './src/index.html',
                pathIndex: './src/index',
                templateParameters: {
                    title: 'Test',
                },
            },
        },
        cssVersion: '5.0',
    },
    webpack(config) {
        return config;
    },
});
