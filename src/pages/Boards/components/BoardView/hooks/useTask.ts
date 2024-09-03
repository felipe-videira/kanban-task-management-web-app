import { Ref, useCallback, useState } from "react";

export default function useTask(
  getRef: (id: string) => HTMLDivElement,
  onTaskReorder: (
    selectedColumnIndex: number,
    selectedTaskIndex: number,
    targetColumnIndex: number,
    targetTaskIndex: number
  ) => void
) {
  const [selectedTask, setSelectedTask] = useState<Selected>(null);
  const [targetTask, setTargetTask] = useState<Selected>(null);
  const [isDraggingTask, setIsDraggingTask] = useState(false);

  const handleTaskMouseUp = useCallback(
    (event) => {
      if (selectedTask && selectedTask.task && event.button === 0) {
        if (targetTask) {
          onTaskReorder(
            selectedTask.columnIndex,
            selectedTask.taskIndex,
            targetTask.columnIndex,
            targetTask.taskIndex
          );

          if (targetTask.task) {
            const targetEl = getRef(targetTask.task.id);
            targetEl.style.marginTop = "0";
            targetEl.style.marginBottom = `0`;
          }
        }

        const selectedEl = getRef(selectedTask.task.id);
        selectedEl.classList.remove("board-view__item--selected");
        selectedEl.style.transform = `translate(0)`;
        selectedEl.style.top = `0px`;
        selectedEl.style.left = `0px`;

        setSelectedTask(null);
        setTargetTask(null);
        setIsDraggingTask(false);
      }
    },
    [selectedTask, targetTask, getRef]
  );

  const handleTaskMouseDown = useCallback(
    (event) => {
      if (selectedTask && selectedTask.task && event.button === 0) {
        const selectedEl = getRef(selectedTask.task.id);
        const { y, x, height } = selectedEl.getBoundingClientRect();

        selectedEl.style.top = `${y}px`;
        selectedEl.style.left = `${x}px`;
        selectedEl.classList.add("board-view__item--selected");

        setIsDraggingTask(true);
        setSelectedTask({
          ...selectedTask,
          currentY: y,
          currentX: x,
          height,
        });
      }
    },
    [selectedTask, getRef]
  );

  const handleTaskDrag = useCallback(
    (event) => {
      if (
        selectedTask &&
        isDraggingTask &&
        selectedTask.height &&
        selectedTask.currentY &&
        selectedTask.currentX
      ) {
        const offset = selectedTask.height / 2;
        const selectedEl = getRef(selectedTask.task.id);
        const translateX = event.clientX - selectedTask.currentX - offset;
        const translateY = event.clientY - selectedTask.currentY - offset;

        selectedEl.style.transform = `translate(${translateX}px, ${translateY}px)`;
      }
    },
    [selectedTask, isDraggingTask, getRef]
  );

  const onMouseEnterSelectedTask = useCallback(
    (column, columnIndex, taskIndex, task = null) => {
      if (!isDraggingTask) {
        setSelectedTask({ column, task, columnIndex, taskIndex });
      } else if (selectedTask) {
        if (task) {
          const el = getRef(task.id);
          el.style.marginTop = `${selectedTask?.height}px`;
          el.classList.add("board-view__item--target-up");
        }

        setTargetTask({ column, task, columnIndex, taskIndex });
      }
    },
    [selectedTask, isDraggingTask, getRef]
  );

  const onMouseLeaveSelectedTask = useCallback(
    (task = null) => {
      if (!isDraggingTask) {
        setSelectedTask(null);
      } else {
        if (task) {
          const el = getRef(task.id);
          el.style.marginTop = "0";
          el.style.marginBottom = `0`;
          el.classList.remove("board-view__item--target-up");
          el.classList.remove("board-view__item--target-down");
        }

        setTargetTask(null);
      }
    },
    [isDraggingTask, getRef]
  );

  return {
    selectedTask,
    targetTask,
    isDraggingTask,
    handleTaskMouseUp,
    handleTaskMouseDown,
    handleTaskDrag,
    onMouseEnterSelectedTask,
    onMouseLeaveSelectedTask,
  };
}
