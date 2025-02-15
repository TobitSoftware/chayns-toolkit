import { buildToolkitConfig } from 'chayns-toolkit';
import { pluginBabel } from '@rsbuild/plugin-babel';

export default buildToolkitConfig({
    development: {
        // cert: '//fs1/SSL/tobitag.crt',
        // key: '//fs1/SSL/tobitag.key',
        port: Number(process.env.PORT || 8080),
    },
    output: {
        prefixCss: true,
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
        config.plugins ??= [];
        config.plugins.push(
            pluginBabel({
                include: /\.(?:jsx|tsx)$/,
                babelLoaderOptions(opts) {
                    opts.plugins?.unshift([
                        '@babel/plugin-proposal-pipeline-operator',
                        {
                            proposal: 'fsharp',
                        },
                    ]);
                },
            }),
        );

        return config;
    },
});
