import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';


export default defineConfig(({ mode }) => {
  // 載入對應環境的 `.env` 檔案
  const env = loadEnv(mode, '.');
  const { VITE_NAME, VITE_MINIFY, VITE_API_URL } = env;

  console.log({
    環境: VITE_NAME,
    minify: VITE_MINIFY
  });

  return {
    base: `/${VITE_NAME}`,  // 確保 base 以斜線開頭
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/server': {
          target: `${VITE_API_URL}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/server/, ''),
          secure: false,
        },
      },
      open: true,
      port: 5173,
      host: '0.0.0.0',
      hmr: true,
    },
    build: {
      // 根據環境設定輸出目錄
      outDir: `dist/${VITE_NAME}`,
      // 使用環境變數設定壓縮方式
      minify: VITE_MINIFY,
      // 添加構建優化選項
      target: 'esnext',
      cssCodeSplit: true,
      sourcemap: mode === 'devWatch',
      terserOptions: {
        compress: {
          drop_console: mode === 'prod',
          drop_debugger: mode === 'prod'
        }
      }
    }
  };
});
