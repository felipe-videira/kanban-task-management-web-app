import { useCallback, useState } from "react";

export default function useTask(getRef, onTaskReorder) {
  const [selectedTask, setSelectedTask] = useState<Selected>(null);
  const [targetTask, setTargetTask] = useState<Selected>(null);
  const [isDraggingTask, setIsDraggingTask] = useState(false);

  const handleTaskMouseUp = useCallback(
    (event) => {
      if (selectedTask && event.button === 0) {
        if (targetTask) {
          onTaskReorder(
            selectedTask.columnIndex,
            selectedTask.taskIndex,
            targetTask.columnIndex,
            targetTask.taskIndex
          );

          const targetEl = getRef(targetTask.task.id);
          targetEl.style.marginTop = "0";
          targetEl.style.marginBottom = `0`;
        }

        const selectedEl = getRef(selectedTask.task.id);
        selectedEl.classList.remove("board-view__item--selected");
        selectedEl.style.transform = `translate(0)`;

        setSelectedTask(null);
        setTargetTask(null);
        setIsDraggingTask(false);
      }
    },
    [selectedTask, targetTask, getRef]
  );

  const handleTaskMouseDown = useCallback(
    (event) => {
      if (selectedTask && event.button === 0) {
        const selectedEl = getRef(selectedTask.task.id);
        selectedEl.classList.add("board-view__item--selected");

        const { y, x, height } = selectedEl.getBoundingClientRect();

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
    (column, task, columnIndex, taskIndex) => {
      if (!isDraggingTask) {
        setSelectedTask({ column, task, columnIndex, taskIndex });
      } else if (selectedTask) {
        const el = getRef(task.id);
        el.style.marginTop = `${selectedTask?.height}px`;
        el.classList.add("board-view__item--target-up");

        setTargetTask({ column, columnIndex, taskIndex });
      }
    },
    [selectedTask, isDraggingTask, getRef]
  );

  const onMouseLeaveSelectedTask = useCallback(
    (column, task) => {
      if (!isDraggingTask) {
        setSelectedTask(null);
      } else {
        const el = getRef(task.id);
        el.style.marginTop = "0";
        el.style.marginBottom = `0`;
        el.classList.remove("board-view__item--target-up");
        el.classList.remove("board-view__item--target-down");

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
