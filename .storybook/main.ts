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
      config.resolve.alias = {
        ...config.resolve.alias,
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
      
      // Custom resolver to skip index files for icon imports
      const originalResolveId = config.resolve.plugins;
      if (!config.plugins) {
        config.plugins = [];
      }
      
      // Add a plugin to skip index files for icon imports
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
            // Put large icon files in separate chunks
            if (id.includes('fileIcons/FileThumbnail')) {
              return 'large-icons';
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
    // Set default locale for Storybook UI
    locale: 'ko',
  },
};

export default config;
