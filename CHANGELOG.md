# Changelog

## [0.2.0] - 2026-02-10

### Performance

- **패키지 크기 128MB → ~40MB** (70% 감소)
  - 소스맵 파일(.map) 배포 패키지에서 제외 (-48MB)
  - 아이콘 개별 .d.ts 파일 제외 (-18MB, -6,800 파일)
  - 선언문 소스맵(.d.ts.map) 비활성화 (-4,462 파일)

- **개발 서버 시작 시간 개선**
  - BrandIcon, FileIcon 레지스트리를 React.lazy()로 전환 (지연 로딩)
  - Icon.mjs 글로브 맵 제거 (318KB → ~5KB)
  - Tailwind CSS 컨텐츠 스캔 범위 축소 (CSS 1.3MB → ~0.8MB)

### Added

- 서브패스 임포트 지원: `import { Button } from '@mbisolution/blumnai-design-system/button'`
- 소비자 프로젝트를 위한 최적화 가이드 (README.md)

### Notes

- CSS는 별도 임포트를 권장합니다:
  `import '@mbisolution/blumnai-design-system/styles';`
