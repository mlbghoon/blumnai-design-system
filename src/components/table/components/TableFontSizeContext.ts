import * as React from 'react';

export type TableFontSize = 'xs' | 'sm' | 'md';

export const TableFontSizeContext = React.createContext<TableFontSize>('sm');

export function useTableFontSize(): TableFontSize {
  return React.useContext(TableFontSizeContext);
}

export function getTableFontClasses(size: TableFontSize): string {
  switch (size) {
    case 'xs':
      return 'size-xs line-height-leading-4';
    case 'sm':
      return 'size-sm line-height-leading-5';
    case 'md':
      return 'size-md line-height-leading-6';
  }
}

export function getDefaultRowHeight(size: TableFontSize): string {
  switch (size) {
    case 'xs':
      return '32px';
    case 'sm':
      return '36px';
    case 'md':
      return '40px';
  }
}
