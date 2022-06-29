import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {resolve} from 'path';
import {ConfigEnv, UserConfigExport} from 'vite';
import {createStyleImportPlugin, VantResolve} from 'vite-plugin-style-import';
import {viteMockServe} from 'vite-plugin-mock';
// import eruda from 'vite-plugin-eruda';


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
      createStyleImportPlugin({
        resolves: [VantResolve()],
      }),
      // eruda(),
      viteMockServe({
        mockPath: './src/mock',
        localEnabled: command === 'serve',
        logger: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
  };
}
