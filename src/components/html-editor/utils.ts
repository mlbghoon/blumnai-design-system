/**
 * 빈 Tiptap HTML을 빈 문자열로 정규화
 *
 * Tiptap은 빈 에디터에서 `<p></p>`를 반환하므로,
 * consumer에게 빈 문자열을 전달하기 위해 정규화합니다.
 */
export function normalizeHtmlContent(html: string, isEmpty: boolean): string {
  if (isEmpty) return '';
  return html;
}

/**
 * HTML 문자열의 UTF-8 바이트 크기 계산
 *
 * 한글 문자는 3바이트로 계산됩니다.
 */
export function calculateContentSize(html: string): number {
  if (!html) return 0;
  return new Blob([html]).size;
}

/**
 * 이미지 파일 유효성 검증
 *
 * @returns 에러가 있으면 Error 객체, 없으면 null
 */
export function validateImageFile(file: File, maxSize?: number): Error | null {
  if (!file) return new Error('파일이 없습니다.');
  if (maxSize !== undefined && file.size > maxSize) {
    const maxMB = (maxSize / (1024 * 1024)).toFixed(0);
    return new Error(`파일 크기가 ${maxMB}MB를 초과합니다.`);
  }
  return null;
}
