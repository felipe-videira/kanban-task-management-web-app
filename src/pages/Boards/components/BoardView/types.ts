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
