const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve('./');
module.exports = {
    development: {},
    output: {
        // prefixCss: true,
        // injectCssInPage: true,
        // exposeModules: {
        // 	"./AppWrapper": "./src/AppWrapper",
        // },
        // apiVersion: 5
    },
    webpack(config) {
        config.entry = {
            index: [path.resolve('src/index')],
            dialog: [path.resolve('src/dialog')],
        };

        config.plugins.push(
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index'],
                template: path.resolve(ROOT_PATH, 'src/index2.html'),
            })
        );

        config.plugins.push(
            new HtmlWebpackPlugin({
                filename: 'dialog.html',
                chunks: ['dialog'],
                template: path.resolve(ROOT_PATH, 'src/dialog.html'),
            })
        );

        const babelRule = config.module.rules.find(
            (rule) => rule.use.loader && rule.use.loader.includes('babel-loader')
        );

        if (!babelRule) return config;

        const babelOptions = babelRule.use.options;

        // const pipelinePlugin = ['@babel/plugin-proposal-pipeline-operator', { proposal: 'hack' }];
        //
        // if (Array.isArray(babelOptions.plugins)) {
        //     babelOptions.plugins.push(pipelinePlugin);
        // } else {
        //     babelOptions.plugins = [pipelinePlugin];
        // }

        return config;
    },
    jest(config) {
        config.transformIgnorePatterns = [
            // required for node_modules with es6 syntax
            '/node_modules/(?!lodash-es).+\\.js$',
        ];

        return config;
    },
    webpackDev(config) {
        return config;
    },
};
