import type { StorybookConfig } from "@storybook/react-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)", "../src/**/*.mdx"],
  addons: ['@storybook/addon-docs'],
  viteFinal: async (config) => {
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    const path = await import('path');
    const { fileURLToPath } = await import('url');

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const projectRoot = path.resolve(__dirname, '..');

    if (!config.plugins) config.plugins = [];
    config.plugins.push(tailwindcss());
    config.plugins.push(vanillaExtractPlugin());

    // react-docgen이 아이콘 데이터 파일을 파싱하지 않도록 패치
    // 수백 개 export가 있는 대용량 파일에서 Babel AST 파싱이 10-20초 소요됨
    const iconDataRE = /\/components\/icons\/\w+\/icons\//;
    const flatPlugins = (config.plugins ?? []).flat();
    for (const p of flatPlugins) {
      if (p && typeof p === 'object' && 'name' in p && p.name === 'storybook:react-docgen-plugin' && 'transform' in p) {
        type TransformFn = (src: string, id: string, ...rest: unknown[]) => unknown;
        const origTransform = p.transform as TransformFn;
        const plugin = p as Record<string, unknown>;
        plugin.transform = function (this: unknown, src: string, id: string, ...rest: unknown[]) {
          if (iconDataRE.test(id)) return undefined;
          return (origTransform as TransformFn).call(this, src, id, ...rest);
        };
      }
    }

    // 경로 별칭
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        constants: path.resolve(projectRoot, 'src/constants'),
        components: path.resolve(projectRoot, 'src/components'),
        icons: path.resolve(projectRoot, 'src/icons'),
        utils: path.resolve(projectRoot, 'src/utils'),
        styles: path.resolve(projectRoot, 'src/styles'),
        tokens: path.resolve(projectRoot, 'src/tokens'),
        hooks: path.resolve(projectRoot, 'src/hooks'),
        '@': path.resolve(projectRoot, 'src'),
      };
    }

    if (!config.server) config.server = {};
    config.server.fs = { ...config.server.fs, strict: false };

    config.cacheDir = 'node_modules/.vite-storybook';
    config.logLevel = 'warn';

    return config;
  },
};

export default config;
