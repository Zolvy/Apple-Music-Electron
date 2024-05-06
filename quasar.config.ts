/* eslint-env node */
import { configure } from 'quasar/wrappers';
import { fileURLToPath } from 'node:url';

export default configure((ctx) => {
  return {
    boot: ['i18n'],
    css: ['app.scss'],
    extras: ['roboto-font', 'material-icons'],
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      vueRouterMode: 'hash', // available values: 'hash', 'history'

      vitePlugins: [
        [
          '@intlify/unplugin-vue-i18n/vite',
          {
            ssr: ctx.modeName === 'ssr',
            include: [fileURLToPath(new URL('./src/i18n', import.meta.url))],
          },
        ],
        [
          'vite-plugin-checker',
          {
            vueTsc: {
              tsconfigPath: 'tsconfig.vue-tsc.json',
            },
            eslint: {
              lintCommand: 'eslint "./**/*.{js,ts,mjs,cjs,vue}"',
            },
          },
          { server: false },
        ],
      ],
    },
    devServer: {
      open: false, // opens browser window automatically
    },
    framework: {
      config: {},
      plugins: ['Platform'],
    },
    animations: [],
    ssr: {
      prodPort: 3000, // The default port that the production server should use

      middlewares: ['render'],
      pwa: false,
    },
    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
    },
    cordova: {},

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      bundler: 'builder', // Use 'builder' to leverage Electron Builder
      builder: {
        appId: 'com.zolvy.AppleMusic',
        mac: {
          target: 'dmg',
          category: 'public.app-category.music',
        },
        dmg: {
          // Optional DMG configuration settings
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications',
            },
            {
              x: 130,
              y: 150,
              type: 'file',
            },
          ],
        },
        win: {
          target: 'msi',
        },
        publish: null,
      },
    },

    bex: {
      contentScripts: ['my-content-script'],
    },
  };
});
