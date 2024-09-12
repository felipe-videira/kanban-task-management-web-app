type SelectedTask = {
  column: Column;
  task: Task;
  columnIndex: number;
  taskIndex: number;
  height?: number;
  width?: number;
  currentY?: number;
  currentX?: number;
} | null;

type SelectedColumn = {
  column: Column;
  index: number;
  width?: number;
  currentY?: number;
  currentX?: number;
} | null;
