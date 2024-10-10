module.exports = {
    development: {
        cert: '//fs1/SSL/tobitag.crt',
        key: '//fs1/SSL/tobitag.key',
        port: 8080,
    },
    output: {
        // prefixCss: true,
        // exposeModules: {
        // 	"./AppWrapper": "./src/AppWrapper",
        // },
        // apiVersion: 5,
        entryPoints: {
            index: {
                pathHtml: './src/index2.html',
                pathIndex: './src/index',
                templateParameters: {
                    title: 'Test',
                },
            },
        },
    },
    webpack(config) {
        return config;
    },
};
