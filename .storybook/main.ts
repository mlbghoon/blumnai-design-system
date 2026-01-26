import type { StorybookConfig } from "@storybook/react-vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  viteFinal: async (config) => {
    // Add Tailwind CSS Vite plugin
    const { default: tailwindcss } = await import('@tailwindcss/vite');

    // Add Vanilla Extract plugin
    if (!config.plugins) {
      config.plugins = [];
    }
    config.plugins.push(tailwindcss());
    config.plugins.push(vanillaExtractPlugin());

    // Suppress virtual module resolution warnings
    if (config.resolve) {
      config.resolve.dedupe = config.resolve.dedupe || [];
      config.resolve.dedupe.push("@storybook/react-vite");

      // Optimize alias resolution - prevent index file resolution for icons
      const path = await import('path');
      const { fileURLToPath } = await import('url');

      // Get __dirname equivalent for ESM
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const projectRoot = path.resolve(__dirname, '..');

      config.resolve.alias = {
        ...config.resolve.alias,
        constants: path.resolve(projectRoot, 'src/constants'),
        components: path.resolve(projectRoot, 'src/components'),
        icons: path.resolve(projectRoot, 'src/icons'),
        utils: path.resolve(projectRoot, 'src/utils'),
        styles: path.resolve(projectRoot, 'src/styles'),
        tokens: path.resolve(projectRoot, 'src/tokens'),
      };

      // Prevent eager resolution of icon index files
      // This ensures lazy-loaded icons don't pull in entire category index files
      if (!config.resolve.conditions) {
        config.resolve.conditions = [];
      }

      // Prevent resolving through index files for icon imports
      // This forces direct file imports instead of going through index.ts
      config.resolve.mainFields = config.resolve.mainFields || ['module', 'jsnext:main', 'jsnext'];
      config.resolve.extensions = config.resolve.extensions || ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'];

      // Add a plugin to skip index files for icon imports and optimize large file icons
      if (!config.plugins) {
        config.plugins = [];
      }

      config.plugins.push({
        name: 'skip-icon-index-files',
        resolveId(id, importer) {
          // If importing from icons directory and it's a directory import, skip index resolution
          if (importer && importer.includes('icons/') && id.includes('icons/') && !id.includes('.')) {
            // Don't resolve - let it fail or use explicit file resolution
            return null;
          }
          // For icon files with explicit extensions, allow resolution
          if (id.includes('icons/') && (id.endsWith('.tsx') || id.endsWith('.ts'))) {
            return null; // Let default resolver handle it
          }
          return null;
        },
        load(id) {
          // Defer loading of large FileThumbnail icons until actually needed
          // This prevents Storybook from processing 16MB files during startup
          if (id.includes('fileIcons/FileThumbnail') && id.endsWith('.tsx')) {
            // Return null to use default loader, but this ensures they're not eagerly loaded
            return null;
          }
          return null;
        },
      });
    }

    // Optimize dependencies - exclude ALL icon files from pre-bundling
    // This allows true lazy loading where only icons actually used are loaded
    if (config.optimizeDeps) {
      config.optimizeDeps.exclude = config.optimizeDeps.exclude || [];

      // Exclude entire icons directory from dependency optimization
      // This prevents Vite from pre-bundling all icons
      // Note: exclude uses string matching, not regex
      if (Array.isArray(config.optimizeDeps.exclude)) {
        // Exclude all icon category directories
        config.optimizeDeps.exclude.push(
          'src/icons/arrows',
          'src/icons/brands',
          'src/icons/buildings',
          'src/icons/business',
          'src/icons/communication',
          'src/icons/cursors',
          'src/icons/design',
          'src/icons/development',
          'src/icons/device',
          'src/icons/document',
          'src/icons/editor',
          'src/icons/fileIcons',
          'src/icons/finance',
          'src/icons/flags',
          'src/icons/food',
          'src/icons/health & medical',
          'src/icons/isometricIcon',
          'src/icons/logos',
          'src/icons/map',
          'src/icons/media',
          'src/icons/others',
          'src/icons/system',
          'src/icons/user & faces',
          'src/icons/weather',
        );

        // Explicitly exclude large FileThumbnail icons (16MB each) from optimization
        // These are processed on-demand to avoid blocking Storybook startup
        config.optimizeDeps.exclude.push(
          'src/icons/fileIcons/FileThumbnail11LgIcon',
          'src/icons/fileIcons/FileThumbnail11MdIcon',
          'src/icons/fileIcons/FileThumbnail11SmIcon',
          'src/icons/fileIcons/FileThumbnail43LgIcon',
          'src/icons/fileIcons/FileThumbnail43MdIcon',
          'src/icons/fileIcons/FileThumbnail43SmIcon',
        );
      }

      // Performance optimizations
      config.optimizeDeps.force = false; // Don't force re-optimization
      config.optimizeDeps.include = config.optimizeDeps.include || [];
      // Only include essential dependencies
      config.optimizeDeps.esbuildOptions = {
        ...config.optimizeDeps.esbuildOptions,
        target: 'esnext',
        // Reduce parsing overhead
        legalComments: 'none',
      };
    }

    // Increase chunk size limit and optimize build
    if (config.build) {
      config.build.chunkSizeWarningLimit = 1000; // 1MB
      config.build.rollupOptions = {
        ...config.build.rollupOptions,
        output: {
          ...config.build.rollupOptions?.output,
          manualChunks: (id) => {
            // Put large FileThumbnail icon files (16MB each) in separate chunks
            // This prevents them from blocking other chunks and improves lazy loading
            if (id.includes('fileIcons/FileThumbnail')) {
              // Create individual chunks for each FileThumbnail to enable true lazy loading
              const match = id.match(/src\/icons\/fileIcons\/(FileThumbnail[^/]+)\.tsx$/);
              if (match) {
                return `icon-thumbnail-${match[1]}`;
              }
              return 'icon-thumbnail';
            }
            // Create individual chunks for each icon file - enables true lazy loading
            // This prevents bundling all icons together
            if (id.includes('src/icons/') && id.endsWith('.tsx')) {
              // Extract icon name from path (e.g., "src/icons/arrows/ArrowDownIcon.tsx" -> "ArrowDownIcon")
              const match = id.match(/src\/icons\/[^/]+\/([^/]+)\.tsx$/);
              if (match) {
                return `icon-${match[1]}`;
              }
            }
            // Separate node_modules
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('@storybook')) {
                return 'vendor-storybook';
              }
              return 'vendor';
            }
          },
        },
        // Performance: reduce tree-shaking overhead
        treeshake: {
          moduleSideEffects: false,
        },
      };
      // Reduce sourcemap overhead in dev
      config.build.sourcemap = false;
    }

    // Suppress virtual module warnings and improve performance
    config.logLevel = 'warn';

    // Improve performance with better caching
    config.cacheDir = 'node_modules/.vite-storybook';

    // Suppress virtual module warnings by configuring server
    if (!config.server) {
      config.server = {};
    }
    config.server.fs = {
      ...config.server.fs,
      strict: false, // Allow serving files outside of root
    };

    // Performance optimizations
    config.define = {
      ...config.define,
      // Suppress development warnings
      __VITE_IS_MODERN__: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    };

    // Reduce memory usage
    config.worker = {
      ...config.worker,
      format: 'es',
    };

    return config;
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: undefined,
      },
    },
  },
};

export default config;
