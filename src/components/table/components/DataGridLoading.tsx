import { cn } from '@/lib/utils';

interface DataGridLoadingProps {
  gridTemplateColumns: string;
  rowCount?: number;
  overlay?: boolean;
}

export function DataGridLoading({
  gridTemplateColumns,
  rowCount = 5,
  overlay = false,
}: DataGridLoadingProps) {
  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-default/80 z-20">
        <div className="flex items-center gap-8">
          <div className="width-20 height-20 border-2 border-state-primary border-t-transparent rounded-full animate-spin" />
          <span className="font-body size-sm text-subtle">로딩 중...</span>
        </div>
      </div>
    );
  }

  const columnCount = gridTemplateColumns.split(' ').length;

  return (
    <div role="rowgroup" className="[&>*:last-child]:border-b-0">
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          role="row"
          className="grid border-b-default animate-pulse"
          style={{ gridTemplateColumns }}
        >
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <div
              key={colIndex}
              role="gridcell"
              className={cn(
                'height-32 padding-x-10 flex items-center',
                'border-r-default last:border-r-0'
              )}
            >
              <div
                className="h-4 bg-basic-gray-alpha-10 rounded"
                style={{
                  width: `${Math.random() * 40 + 40}%`,
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
