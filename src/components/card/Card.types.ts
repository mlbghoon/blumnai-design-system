export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 카드 스타일 variant */
  variant?: 'default' | 'outline' | 'ghost';
  /** 인터랙티브 카드 (클릭 가능, role="button", tabIndex, 키보드 지원) */
  interactive?: boolean;
}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 렌더링할 heading 엘리먼트 (h1-h6) @default 'h3' */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export interface CardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 그리드 컬럼 수 @default 3 */
  columns?: 1 | 2 | 3 | 4;
}
