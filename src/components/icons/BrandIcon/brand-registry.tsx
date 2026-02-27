// This file is auto-generated. Do not edit manually.
// Run: npm run generate:brands

import { lazy } from 'react';
import type { LazyExoticComponent, ComponentType } from 'react';

import type { Props } from '../Icon/IconWrapper.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ChunkModule = Record<string, ComponentType<any>>;

const chunkModuleCache: Record<string, ChunkModule> = {};
const chunkLoadPromises: Record<string, Promise<ChunkModule>> = {};

const chunkImporters: Record<string, () => Promise<ChunkModule>> = {
  'brands-a': () => import('./icons/brands-a'),
  'brands-bc': () => import('./icons/brands-bc'),
  'brands-de': () => import('./icons/brands-de'),
  'brands-fg': () => import('./icons/brands-fg'),
  'brands-hm': () => import('./icons/brands-hm'),
  'brands-np': () => import('./icons/brands-np'),
  'brands-rs': () => import('./icons/brands-rs'),
  'brands-tz': () => import('./icons/brands-tz'),
};

const iconLookup: Record<string, [string, string]> = {
  'adobe': ['brands-a', 'BrandAdobeIcon'],
  'affinity designer': ['brands-a', 'BrandAffinityDesignerIcon'],
  'after effects': ['brands-a', 'BrandAfterEffectsIcon'],
  'airbnb': ['brands-a', 'BrandAirbnbIcon'],
  'algorand': ['brands-a', 'BrandAlgorandIcon'],
  'aliexpress': ['brands-a', 'BrandAliExpressIcon'],
  'android': ['brands-a', 'BrandAndroidIcon'],
  'angular': ['brands-a', 'BrandAngularIcon'],
  'apple': ['brands-a', 'BrandAppleIcon'],
  'apple music': ['brands-a', 'BrandAppleMusicIcon'],
  'arc': ['brands-a', 'BrandArcIcon'],
  'arc browser': ['brands-a', 'BrandArcBrowserIcon'],
  'asana': ['brands-a', 'BrandAsanaIcon'],
  'binance': ['brands-bc', 'BrandBinanceIcon'],
  'bing': ['brands-bc', 'BrandBingIcon'],
  'bitcoin': ['brands-bc', 'BrandBitcoinIcon'],
  'blender': ['brands-bc', 'BrandBlenderIcon'],
  'bluesky': ['brands-bc', 'BrandBlueskyIcon'],
  'bnb': ['brands-bc', 'BrandBNBIcon'],
  'bootstrap': ['brands-bc', 'BrandBootstrapIcon'],
  'canva': ['brands-bc', 'BrandCanvaIcon'],
  'cash app': ['brands-bc', 'BrandCashAppIcon'],
  'chatgpt': ['brands-bc', 'BrandChatGPTIcon'],
  'chrome': ['brands-bc', 'BrandChromeIcon'],
  'chromium': ['brands-bc', 'BrandChromiumIcon'],
  'claude': ['brands-bc', 'BrandClaudeIcon'],
  'clerk': ['brands-bc', 'BrandClerkIcon'],
  'cody': ['brands-bc', 'BrandCodyIcon'],
  'coinbase': ['brands-bc', 'BrandCoinbaseIcon'],
  'copilot': ['brands-bc', 'BrandCopilotIcon'],
  'custom ai': ['brands-bc', 'BrandCustomAIIcon'],
  'deepseek': ['brands-de', 'BrandDeepseekIcon'],
  'digitalocean': ['brands-de', 'BrandDigitalOceanIcon'],
  'discord': ['brands-de', 'BrandDiscordIcon'],
  'docker': ['brands-de', 'BrandDockerIcon'],
  'doge': ['brands-de', 'BrandDogeIcon'],
  'dotenv': ['brands-de', 'BrandDotenvIcon'],
  'dropbox': ['brands-de', 'BrandDropboxIcon'],
  'dub': ['brands-de', 'BrandDubIcon'],
  'edge': ['brands-de', 'BrandEdgeIcon'],
  'elysiajs': ['brands-de', 'BrandElysiaJSIcon'],
  'ethereum': ['brands-de', 'BrandEthereumIcon'],
  'facebook': ['brands-fg', 'BrandFacebookIcon'],
  'figma': ['brands-fg', 'BrandFigmaIcon'],
  'firefox': ['brands-fg', 'BrandFirefoxIcon'],
  'framer': ['brands-fg', 'BrandFramerIcon'],
  'gimp': ['brands-fg', 'BrandGimpIcon'],
  'github': ['brands-fg', 'BrandGitHubIcon'],
  'gitlab': ['brands-fg', 'BrandGitLabIcon'],
  'gnail': ['brands-fg', 'BrandGnailIcon'],
  'google': ['brands-fg', 'BrandGoogleIcon'],
  'google drive': ['brands-fg', 'BrandGoogleDriveIcon'],
  'hashnode': ['brands-hm', 'BrandHashnodeIcon'],
  'illustrator': ['brands-hm', 'BrandIllustratorIcon'],
  'instatus': ['brands-hm', 'BrandInstatusIcon'],
  'json': ['brands-hm', 'BrandJSONIcon'],
  'layers': ['brands-hm', 'BrandLayersIcon'],
  'leap wallet': ['brands-hm', 'BrandLeapWalletIcon'],
  'lemon squeezy': ['brands-hm', 'BrandLemonSqueezyIcon'],
  'lightroom': ['brands-hm', 'BrandLightroomIcon'],
  'linear': ['brands-hm', 'BrandLinearIcon'],
  'link': ['brands-hm', 'BrandLink__398336695Icon'],
  'link _4146131087': ['brands-hm', 'BrandLink__4146131087Icon'],
  'litecoin': ['brands-hm', 'BrandLitecoinIcon'],
  'mastercard': ['brands-hm', 'BrandMastercardIcon'],
  'mastodon': ['brands-hm', 'BrandMastodonIcon'],
  'matic': ['brands-hm', 'BrandMaticIcon'],
  'messenger': ['brands-hm', 'BrandMessengerIcon'],
  'meta': ['brands-hm', 'BrandMetaIcon'],
  'metamask': ['brands-hm', 'BrandMetamaskIcon'],
  'monero': ['brands-hm', 'BrandMoneroIcon'],
  'nextjs': ['brands-np', 'BrandNextJsIcon'],
  'notion': ['brands-np', 'BrandNotionIcon'],
  'obsidian': ['brands-np', 'BrandObsidianIcon'],
  'onedrive': ['brands-np', 'BrandOneDriveIcon'],
  'opensea': ['brands-np', 'BrandOpenSeaIcon'],
  'opera': ['brands-np', 'BrandOperaIcon'],
  'password': ['brands-np', 'BrandPasswordIcon'],
  'patreon': ['brands-np', 'BrandPatreonIcon'],
  'paypal': ['brands-np', 'BrandPayPalIcon'],
  'perplexity': ['brands-np', 'BrandPerplexityIcon'],
  'photoshop': ['brands-np', 'BrandPhotoshopIcon'],
  'pinterest': ['brands-np', 'BrandPinterestIcon'],
  'pitch': ['brands-np', 'BrandPitchIcon'],
  'polar': ['brands-np', 'BrandPolarIcon'],
  'product hunt': ['brands-np', 'BrandProductHuntIcon'],
  'raycast': ['brands-rs', 'BrandRaycastIcon'],
  'react': ['brands-rs', 'BrandReactIcon'],
  'reddit': ['brands-rs', 'BrandRedditIcon'],
  'ruby': ['brands-rs', 'BrandRubyIcon'],
  'safari': ['brands-rs', 'BrandSafariIcon'],
  'shopify': ['brands-rs', 'BrandShopifyIcon'],
  'sketch': ['brands-rs', 'BrandSketchIcon'],
  'skype': ['brands-rs', 'BrandSkypeIcon'],
  'solana': ['brands-rs', 'BrandSolanaIcon'],
  'sort ui': ['brands-rs', 'BrandSortUIIcon'],
  'spotify': ['brands-rs', 'BrandSpotifyIcon'],
  'steam': ['brands-rs', 'BrandSteamIcon'],
  'supabase': ['brands-rs', 'BrandSupabaseIcon'],
  'swift': ['brands-rs', 'BrandSwiftIcon'],
  'tailwind css': ['brands-tz', 'BrandTailwindCSSIcon'],
  'telegram': ['brands-tz', 'BrandTelegramIcon'],
  'tether': ['brands-tz', 'BrandTetherIcon'],
  'threads': ['brands-tz', 'BrandThreadsIcon'],
  'todoist': ['brands-tz', 'BrandTodoistIcon'],
  'ton': ['brands-tz', 'BrandTonIcon'],
  'tron': ['brands-tz', 'BrandTronIcon'],
  'trust': ['brands-tz', 'BrandTrustIcon'],
  'twitch': ['brands-tz', 'BrandTwitchIcon'],
  'unreal engine': ['brands-tz', 'BrandUnrealEngineIcon'],
  'v0': ['brands-tz', 'BrandV0Icon'],
  'vercel': ['brands-tz', 'BrandVercelIcon'],
  'visa': ['brands-tz', 'BrandVisaIcon'],
  'vue': ['brands-tz', 'BrandVueIcon'],
  'webflow': ['brands-tz', 'BrandWebflowIcon'],
  'whop': ['brands-tz', 'BrandWhopIcon'],
  'windows': ['brands-tz', 'BrandWindowsIcon'],
  'wordpress': ['brands-tz', 'BrandWordPressIcon'],
  'xrp': ['brands-tz', 'BrandXRPIcon'],
  'youtube': ['brands-tz', 'BrandYoutubeIcon'],
};

function loadChunk(chunk: string): Promise<ChunkModule> {
  if (chunkModuleCache[chunk]) return Promise.resolve(chunkModuleCache[chunk]);
  if (!chunkLoadPromises[chunk]) {
    const importer = chunkImporters[chunk];
    if (!importer) return Promise.reject(new Error(`Unknown chunk: ${chunk}`));
    chunkLoadPromises[chunk] = importer().then(mod => {
      chunkModuleCache[chunk] = mod as ChunkModule;
      return chunkModuleCache[chunk];
    });
  }
  return chunkLoadPromises[chunk];
}

const lazyCache: Record<string, LazyExoticComponent<ComponentType<Props>>> = {};

export function getBrandSync(key: string): ComponentType<Props> | null {
  const info = iconLookup[key];
  if (!info) return null;
  const [chunk, componentName] = info;
  const mod = chunkModuleCache[chunk];
  if (!mod) return null;
  return (mod[componentName] as ComponentType<Props>) || null;
}

export function getBrandLazy(key: string): LazyExoticComponent<ComponentType<Props>> | null {
  const info = iconLookup[key];
  if (!info) return null;
  if (!lazyCache[key]) {
    const [chunk, componentName] = info;
    lazyCache[key] = lazy(() =>
      loadChunk(chunk).then(mod => ({
        default: mod[componentName] as ComponentType<Props>,
      }))
    );
  }
  return lazyCache[key];
}

export function hasBrand(key: string): boolean {
  return key in iconLookup;
}
