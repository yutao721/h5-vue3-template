import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { ConfigEnv, UserConfigExport, loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';


const pathResolve = (dir: string) => resolve(__dirname, dir);

// https://vitejs.dev/config/
export default function ({ command, mode }: ConfigEnv): UserConfigExport {
  const env = loadEnv(mode, process.cwd(), 'VITE')
  const isProduction = command === 'build';
  console.log(env);
  console.log(isProduction);
  console.log(typeof env.VITE_USE_MOCK, '!!');

  return {
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': pathResolve('./src'),
        '/#': pathResolve('./types'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_USE_MOCK === 'true' ? 'http://localhost:3000' : env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
          secure: false, // 绕过https的安全验证才能请求到https的地址
          bypass(req, res, options) {
            const realUrl = new URL(options.rewrite(req.url) || '', (options.target) as string).href || ''
            res.setHeader('x-res-realUrl', realUrl)
          },
        },
      },
      cors: true
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [VantResolver()],
      }),
      Components({
        resolvers: [VantResolver()],
      }),
      // eruda(),
      viteMockServe({
        mockPath: './src/mock',
        enable: command === 'serve' && env.VITE_USE_MOCK === 'true',
        logger: true,
      })
    ],
    build: {
      target: 'es2015'
    },
  };
}
