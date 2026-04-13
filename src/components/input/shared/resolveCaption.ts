/**
 * 캡션 텍스트 및 상태를 해석하는 유틸리티.
 *
 * 우선순위: error 문자열 > success 문자열 > caption.
 * InputWrapper, InlineFieldWrapper, List 래퍼 등에서 공통으로 사용합니다.
 */
export function resolveCaption(
  error?: boolean | string,
  success?: boolean | string,
  caption?: string,
) {
  const hasError = error === true || (typeof error === 'string' && error.length > 0);
  const hasSuccess = success === true || (typeof success === 'string' && success.length > 0);

  const errorText = typeof error === 'string' && error.length > 0 ? error : undefined;
  const successText = typeof success === 'string' && success.length > 0 ? success : undefined;
  const captionText = errorText || successText || caption;
  const showCaption = !!captionText;

  return { hasError, hasSuccess, captionText, showCaption };
}
