// This file is auto-generated. Do not edit manually.
// Run: npm run generate:file-icons

import { lazy } from 'react';
import type { LazyExoticComponent, ComponentType } from 'react';

import type { Props } from '../Icon/IconWrapper.types';

interface ThumbnailProps extends Props {
  imageSrc?: string;
}

type FileComponent = ComponentType<Props> | ComponentType<ThumbnailProps>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AllModule = Record<string, ComponentType<any>>;

let moduleCache: AllModule | null = null;
let loadPromise: Promise<AllModule> | null = null;

function loadModule(): Promise<AllModule> {
  if (moduleCache) return Promise.resolve(moduleCache);
  if (!loadPromise) {
    loadPromise = import('./icons/all').then(m => {
      moduleCache = m as AllModule;
      return moduleCache;
    });
  }
  return loadPromise;
}

const lookup: Record<string, string> = {
  'archive__lg': 'FileArchiveLgIcon',
  'archive__md': 'FileArchiveMdIcon',
  'archive__sm': 'FileArchiveSmIcon',
  'code__lg': 'FileCodeLgIcon',
  'code__md': 'FileCodeMdIcon',
  'code__sm': 'FileCodeSmIcon',
  'default__lg': 'FileDefaultLgIcon',
  'default__md': 'FileDefaultMdIcon',
  'default__sm': 'FileDefaultSmIcon',
  'image__lg': 'FileImageLgIcon',
  'image__md': 'FileImageMdIcon',
  'image__sm': 'FileImageSmIcon',
  'music__lg': 'FileMusicLgIcon',
  'music__md': 'FileMusicMdIcon',
  'music__sm': 'FileMusicSmIcon',
  'pdf__lg': 'FilePDFLgIcon',
  'pdf__md': 'FilePDFMdIcon',
  'pdf__sm': 'FilePDFSmIcon',
  'thumbnail 1:1__lg': 'FileThumbnail11LgIcon',
  'thumbnail 1:1__md': 'FileThumbnail11MdIcon',
  'thumbnail 1:1__sm': 'FileThumbnail11SmIcon',
  'thumbnail 4:3__lg': 'FileThumbnail43LgIcon',
  'thumbnail 4:3__md': 'FileThumbnail43MdIcon',
  'thumbnail 4:3__sm': 'FileThumbnail43SmIcon',
  'video__lg': 'FileVideoLgIcon',
  'video__md': 'FileVideoMdIcon',
  'video__sm': 'FileVideoSmIcon',
};

const lazyCache: Record<string, LazyExoticComponent<FileComponent>> = {};

export function getFileSync(key: string): FileComponent | null {
  const componentName = lookup[key];
  if (!componentName || !moduleCache) return null;
  return (moduleCache[componentName] as FileComponent) || null;
}

export function getFileLazy(key: string): LazyExoticComponent<FileComponent> | null {
  const componentName = lookup[key];
  if (!componentName) return null;
  if (!lazyCache[key]) {
    lazyCache[key] = lazy(() =>
      loadModule().then(mod => ({
        default: mod[componentName] as FileComponent,
      }))
    );
  }
  return lazyCache[key];
}

export function hasFile(key: string): boolean {
  return key in lookup;
}
