import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {resolve} from 'path';
import {ConfigEnv, UserConfigExport} from 'vite';
import legacy from '@vitejs/plugin-legacy';
import {viteMockServe} from 'vite-plugin-mock';
import eruda from 'vite-plugin-eruda';
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';


const pathResolve = (dir: string) => resolve(__dirname, dir);

// https://vitejs.dev/config/
export default function ({command}: ConfigEnv): UserConfigExport {
  const isProduction = command === 'build';
  const root = process.cwd();
  console.log(isProduction);
  return {
    root,
    resolve: {
      alias: {
        '@': pathResolve('./src'),
        '/#': pathResolve('./types'),
      },
    },
    server: {
      host: '0.0.0.0',
      proxy: {},
      cors: true
    },
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [VantResolver()],
      }),
      eruda(),
      legacy({
        targets: ['chrome 52'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        renderLegacyChunks: true,
        polyfills: [
          'es.symbol',
          'es.array.filter',
          'es.promise',
          'es.promise.finally',
          'es/map',
          'es/set',
          'es.array.for-each',
          'es.object.define-properties',
          'es.object.define-property',
          'es.object.get-own-property-descriptor',
          'es.object.get-own-property-descriptors',
          'es.object.keys',
          'es.object.to-string',
          'web.dom-collections.for-each',
          'esnext.global-this',
          'esnext.string.match-all'
        ]
      }),
      viteMockServe({
        mockPath: './src/mock',
        localEnabled: command === 'serve',
        logger: true,
      }),
    ],
    build: {
      target: 'es2015'
    },
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
  };
}
