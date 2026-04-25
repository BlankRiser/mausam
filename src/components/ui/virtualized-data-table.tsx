import { ColumnDef, flexRender, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  table: ReturnType<typeof useReactTable<TData>>;
  columns: ColumnDef<TData, TValue>[];
  className?: string;
  showStripes?: boolean; // Optional prop to control row striping
}

export const VirtualizedDataTable = <TData, TValue>({
  table,
  columns,
  showStripes = true,
  className = '',
}: DataTableProps<TData, TValue>) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();
  console.log(rows.length);
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 20,
  });

  return (
    <motion.div
      ref={parentRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn([
        'h-[600px] overflow-auto rounded-md border border-neutral-200 dark:border-neutral-800',
        className,
      ])}
    >
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <Table className='border-separate border-spacing-0 [&_td]:border-neutral-200 dark:[&_td]:border-neutral-800 [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-neutral-200 dark:[&_th]:border-neutral-800 [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b'>
          <TableHeader className='sticky top-0 z-10 bg-background/90 backdrop-blur-xs'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=''>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              virtualizer.getVirtualItems().map((virtualRow, index) => {
                const row = rows[virtualRow.index];
                return (
                  <TableRow
                    key={row.id}
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                    }}
                    className={cn([
                      showStripes && 'odd:bg-muted',
                      'cursor-pointer data-[state=selected]:bg-blue-50 data-[state=selected]:dark:bg-blue-950/20',
                    ])}
                    onClick={row.getToggleSelectedHandler()}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};
