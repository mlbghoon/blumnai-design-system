import { CellIcon, DataGrid, RiCheckLine, RiErrorWarningFill } from '@blumnai-studio/blumnai-design-system';
import type { ColumnDef } from '@tanstack/react-table';

interface Row {
  id: string;
  status: 'ok' | 'warn';
}

export function MyTable({ rows }: { rows: Row[] }) {
  const columns: ColumnDef<Row>[] = [
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const isOk = row.original.status === 'ok';
        // Static literal tuple — codemod should rewrite to `icon={Ri*Line|Fill}`.
        if (isOk) return <CellIcon icon={RiCheckLine} color="success" />;
        return <CellIcon icon={RiErrorWarningFill} color="warning" label="경고" />;
      },
    },
  ];

  return <DataGrid data={rows} columns={columns} getRowId={(r) => r.id} />;
}
