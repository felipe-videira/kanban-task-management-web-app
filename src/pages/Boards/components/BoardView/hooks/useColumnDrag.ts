import { Ref, useCallback, useState } from "react";

export default function useColumnDrag(
  getRef: (id: string | undefined) => HTMLDivElement | null,
  onColumnReorder: (selectedIndex: number, targetIndex: number) => void
) {
  const [selectedColumn, setSelectedColumn] = useState<SelectedColumn>(null);
  const [targetColumn, setTargetColumn] = useState<SelectedColumn>(null);
  const [isDraggingColumn, setIsDraggingColumn] = useState(false);

  const handleColumnMouseUp = useCallback(
    (event) => {
      if (selectedColumn && event.button === 0) {
        if (targetColumn) {
          onColumnReorder(selectedColumn.index, targetColumn.index);

          if (targetColumn.column) {
            const targetEl = getRef(targetColumn.column.id);
            if (targetEl) {
              targetEl.style.marginLeft = "0";
            }
          }
        }

        const selectedEl = getRef(selectedColumn.column.id);
        if (selectedEl) {
          selectedEl.style.transform = "none";
          selectedEl.classList.remove("board-view__column--selected");
          selectedEl.style.top = `0px`;
          selectedEl.style.left = `0px`;
        }

        setSelectedColumn(null);
        setTargetColumn(null);
        setIsDraggingColumn(false);
      }
    },
    [selectedColumn, targetColumn, getRef]
  );

  const handleColumnMouseDown = useCallback(
    (event, column, index) => {
      if (event.button === 0) {
        const selectedEl = getRef(column.id);
        if (selectedEl) {
          const { y, x, width } = selectedEl.getBoundingClientRect();

          selectedEl.style.top = `${y}px`;
          selectedEl.style.left = `${x}px`;
          selectedEl.classList.add("board-view__column--selected");

          setIsDraggingColumn(true);
          setSelectedColumn({
            column,
            index,
            currentY: y,
            currentX: x,
            width,
          });
        }
      }
    },
    [selectedColumn, getRef]
  );

  const handleColumnDrag = useCallback(
    (event) => {
      if (
        selectedColumn &&
        isDraggingColumn &&
        selectedColumn.width &&
        selectedColumn.currentY &&
        selectedColumn.currentX
      ) {
        const translateX =
          event.clientX - selectedColumn.currentX - selectedColumn.width / 2;

        const selectedEl = getRef(selectedColumn.column.id);
        if (selectedEl) {
          selectedEl.style.transform = `translateX(${translateX}px)`;
        }
      }
    },
    [selectedColumn, isDraggingColumn, getRef]
  );

  const onMouseEnterTargetColumn = useCallback(
    (index, column = null) => {
      if (selectedColumn) {
        if (column) {
          const el = getRef(column.id);

          if (el) {
            el.style.marginLeft = `${selectedColumn?.width}px`;
            el.classList.add("board-view__column--target");
          }
        }

        setTargetColumn({ column, index });
      }
    },
    [selectedColumn, isDraggingColumn, getRef]
  );

  const onMouseLeaveTargetColumn = useCallback(
    (column = null) => {
      if (column) {
        const el = getRef(column.id);
        if (el) {
          el.style.marginLeft = "0";
          el.classList.remove("board-view__column--target");
        }
      }

      setTargetColumn(null);
    },
    [isDraggingColumn, getRef]
  );

  return {
    selectedColumn,
    targetColumn,
    isDraggingColumn,
    handleColumnMouseUp,
    handleColumnMouseDown,
    handleColumnDrag,
    onMouseEnterTargetColumn,
    onMouseLeaveTargetColumn,
  };
}
