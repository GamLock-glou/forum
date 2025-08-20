import { useCallback, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import type { ListChildComponentProps } from "react-window";
import type { ReactElement } from "react";
import styles from "./styles.module.css";

interface VirtualizedTableProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  headers: string[];
  renderRow: (item: T) => ReactElement;
  className?: string;
  columnWidths?: (string | number)[];
}

function VirtualizedTableImpl<T>({
  items,
  height,
  itemHeight,
  headers,
  renderRow,
  className,
  columnWidths,
}: VirtualizedTableProps<T>) {
    const rowData = useMemo(() => ({
      items,
      renderRow,
    }), [items, renderRow]);

    const TableRow = useCallback(({ index, style }: ListChildComponentProps) => {
      const item = rowData.items[index];
      return (
        <div style={style} className={styles.tableRow}>
          {rowData.renderRow(item)}
        </div>
      );
    }, [rowData]);

    return (
      <div className={`${styles.virtualizedTable} ${className || ""}`}>
        <div className={styles.tableHeader}>
          {headers.map((header, index) => (
            <div 
              key={index} 
              className={styles.headerCell}
              style={columnWidths ? { 
                width: columnWidths[index], 
                flexShrink: 0, 
                flexGrow: 0 
              } : { flex: 1 }}
            >
              {header}
            </div>
          ))}
        </div>

        <div className={styles.tableBody}>
          <List
            height={height}
            width="100%"
            itemCount={items.length}
            itemSize={itemHeight}
            itemData={rowData}
            className={styles.virtualList}
          >
            {TableRow}
          </List>
        </div>
      </div>
    );
}

export const VirtualizedTable = VirtualizedTableImpl;
