import { useCallback, useRef, useEffect } from 'react';

interface GridKeyboardNavOptions {
  rowCount: number;
  colCount: number;
  /**
   * 헤더 행 포함 여부 (true이면 행 인덱스 0은 헤더)
   * @default true
   */
  includeHeader?: boolean;
}

/**
 * DataGrid용 roving tabindex 키보드 내비게이션 훅
 *
 * WAI-ARIA APG grid 패턴에 따라 화살표 키, Home/End, Ctrl+Home/End를 지원합니다.
 */
export function useGridKeyboardNav({
  rowCount,
  colCount,
  includeHeader = true,
}: GridKeyboardNavOptions) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const activeRowRef = useRef(includeHeader ? 0 : 0);
  const activeColRef = useRef(0);

  const getCells = useCallback((): HTMLElement[][] => {
    const grid = gridRef.current;
    if (!grid) return [];

    const rows = grid.querySelectorAll<HTMLElement>('[role="row"]');
    const result: HTMLElement[][] = [];

    rows.forEach((row) => {
      const cells = row.querySelectorAll<HTMLElement>(
        '[role="gridcell"], [role="columnheader"]'
      );
      result.push(Array.from(cells));
    });

    return result;
  }, []);

  const focusCell = useCallback(
    (rowIdx: number, colIdx: number) => {
      const cells = getCells();
      if (cells.length === 0) return;

      const clampedRow = Math.max(0, Math.min(rowIdx, cells.length - 1));
      const rowCells = cells[clampedRow];
      if (!rowCells || rowCells.length === 0) return;

      const clampedCol = Math.max(0, Math.min(colIdx, rowCells.length - 1));
      const target = rowCells[clampedCol];
      if (!target) return;

      // 이전 활성 셀의 tabIndex를 -1로 설정
      const prevRow = cells[activeRowRef.current];
      if (prevRow) {
        const prevCell = prevRow[activeColRef.current];
        if (prevCell) {
          prevCell.setAttribute('tabindex', '-1');
        }
      }

      target.setAttribute('tabindex', '0');
      target.focus();

      activeRowRef.current = clampedRow;
      activeColRef.current = clampedCol;
    },
    [getCells]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const { key, ctrlKey, metaKey } = event;
      const ctrl = ctrlKey || metaKey;

      const cells = getCells();
      if (cells.length === 0) return;

      const currentRow = activeRowRef.current;
      const currentCol = activeColRef.current;
      const lastRow = cells.length - 1;
      const lastCol = (cells[currentRow]?.length ?? 1) - 1;

      let nextRow = currentRow;
      let nextCol = currentCol;
      let handled = false;

      switch (key) {
        case 'ArrowRight':
          nextCol = Math.min(currentCol + 1, lastCol);
          handled = true;
          break;
        case 'ArrowLeft':
          nextCol = Math.max(currentCol - 1, 0);
          handled = true;
          break;
        case 'ArrowDown':
          nextRow = Math.min(currentRow + 1, lastRow);
          handled = true;
          break;
        case 'ArrowUp':
          nextRow = Math.max(currentRow - 1, 0);
          handled = true;
          break;
        case 'Home':
          if (ctrl) {
            nextRow = 0;
            nextCol = 0;
          } else {
            nextCol = 0;
          }
          handled = true;
          break;
        case 'End':
          if (ctrl) {
            nextRow = lastRow;
            nextCol = (cells[lastRow]?.length ?? 1) - 1;
          } else {
            nextCol = lastCol;
          }
          handled = true;
          break;
        case 'PageDown':
          nextRow = Math.min(currentRow + 10, lastRow);
          handled = true;
          break;
        case 'PageUp':
          nextRow = Math.max(currentRow - 10, 0);
          handled = true;
          break;
      }

      if (handled) {
        event.preventDefault();
        focusCell(nextRow, nextCol);
      }
    },
    [getCells, focusCell]
  );

  // 초기 tabIndex 설정
  useEffect(() => {
    const cells = getCells();
    if (cells.length === 0) return;

    cells.forEach((rowCells, rowIdx) => {
      rowCells.forEach((cell, colIdx) => {
        if (rowIdx === activeRowRef.current && colIdx === activeColRef.current) {
          cell.setAttribute('tabindex', '0');
        } else {
          cell.setAttribute('tabindex', '-1');
        }
      });
    });
  }, [getCells, rowCount, colCount]);

  return {
    gridRef,
    handleKeyDown,
    focusCell,
  };
}
