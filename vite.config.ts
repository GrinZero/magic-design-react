// @ts-nocheck
import postcss from 'rollup-plugin-postcss';
import { defineConfig } from 'vite';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import dts from 'vite-plugin-dts';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

import { resolve } from 'path';

// import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';

const shouldAnalyze = process.env.ANALYZE ?? false;
const isHttps = process.env.HTTPS ?? false;

// https://vitejs.dev/config/
export default defineConfig((ctx) => {
  return {
    entry: {
      components: resolve(__dirname, 'src/index.ts'),
    },
    plugins: [
      react({
        // Removes React Devtools in production build
        removeDevtoolsInProd: true,

        // Exclude storybook stories
        exclude: /\.stories\.(t|j)sx?$/,
      }),

      // legacy(),

      svgr(),

      mkcert({
        source: 'coding',
      }),

      chunkSplitPlugin({
        strategy: 'all-in-one',
        customSplitting: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      }),
      postcss({
        extract: true,
        plugins: [
          require('postcss-import'),
          require('tailwindcss')({
            config: './tailwind.config.js',
          }),
          require('autoprefixer'),
        ],
      }),
      dts({
        tsConfigFilePath: './tsconfig.json',
      }),
    ],
    build: {
      target: 'es2018',
      outDir: 'dist',
      // cssCodeSplit: true,
      rollupOptions: {
        external: ['react', 'react-dom', 'react-router-dom'],
        output: [
          {
            format: 'umd',
            entryFileNames: '[name].js',
            dir: 'dist/umd',
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react-router-dom': 'ReactRouterDOM',
            },
          },
          {
            format: 'es',
            entryFileNames: '[name].js',
            preserveModules: true,
            dir: 'dist/es',
            preserveModulesRoot: 'src',
          },
        ],
      },
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'magicDesign',
        filename: 'magic-design',
        formats: ['umd', 'es'],
      },
      sourcemap: !!shouldAnalyze,
    },
    css: {
      modules: {
        hashPrefix: 'mg-',
        localsConvention: 'dashes',
      },
      devSourcemap: true,
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
        sass: {
          javascriptEnabled: true,
        },
      },
    },
    cacheDir: './.vite-cache',

    /**
     * defining aliases
     */
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    envDir: resolve(__dirname, 'src', 'env'),
    envPrefix: 'GB_',
  };
});
