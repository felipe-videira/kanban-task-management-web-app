import { Ref, useCallback, useState } from "react";

export default function useTaskDrag(
  getRef: (id: string | undefined) => HTMLDivElement | null,
  onTaskReorder: (
    selectedColumnIndex: number,
    selectedTaskIndex: number,
    targetColumnIndex: number,
    targetTaskIndex: number
  ) => void
) {
  const [selectedTask, setSelectedTask] = useState<SelectedTask>(null);
  const [targetTask, setTargetTask] = useState<SelectedTask>(null);
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

            if (targetEl) {
              targetEl.style.marginTop = "0";
              targetEl.style.marginBottom = `0`;
            }
          }
        }

        const selectedEl = getRef(selectedTask.task.id);
        if (selectedEl) {
          selectedEl.style.transform = "none";
          selectedEl.classList.remove("board-view__task--selected");
          selectedEl.style.top = `0px`;
          selectedEl.style.left = `0px`;
        }

        setSelectedTask(null);
        setTargetTask(null);
        setIsDraggingTask(false);
      }
    },
    [selectedTask, targetTask, getRef]
  );

  const handleTaskMouseDown = useCallback(
    (event, column, task, columnIndex, taskIndex) => {
      if (event.button === 0) {
        event.stopPropagation();

        const selectedEl = getRef(task.id);

        if (selectedEl) {
          const { y, x, height, width } = selectedEl.getBoundingClientRect();
          selectedEl.classList.add("board-view__task--selected");
          selectedEl.style.top = `${document.documentElement.scrollTop + y}px`;
          selectedEl.style.left = `${x}px`;

          setIsDraggingTask(true);
          setSelectedTask({
            column,
            task,
            columnIndex,
            taskIndex,
            currentY: y,
            currentX: x,
            height,
            width,
          });
        }
      }
    },
    [selectedTask, getRef]
  );

  const handleTaskDrag = useCallback(
    (event) => {
      if (
        selectedTask &&
        isDraggingTask &&
        selectedTask.width &&
        selectedTask.currentY &&
        selectedTask.currentX
      ) {
        const translateX =
          event.clientX - selectedTask.currentX - selectedTask.width / 2;
        const translateY = event.clientY - selectedTask.currentY;

        const selectedEl = getRef(selectedTask.task.id);
        if (selectedEl) {
          selectedEl.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
      }
    },
    [selectedTask, isDraggingTask, getRef]
  );

  const onMouseEnterTargetTask = useCallback(
    (column, columnIndex, taskIndex, task = null) => {
      if (selectedTask) {
        if (task) {
          const el = getRef(task.id);
          if (el) {
            el.style.marginTop = `${selectedTask?.height}px`;
            el.classList.add("board-view__task--target");
          }
        }

        setTargetTask({ column, task, columnIndex, taskIndex });
      }
    },
    [selectedTask, isDraggingTask, getRef]
  );

  const onMouseLeaveTargetTask = useCallback(
    (task = null) => {
      if (task) {
        const el = getRef(task.id);
        if (el) {
          el.style.marginTop = "0";
          el.classList.remove("board-view__task--target");
        }
      }

      setTargetTask(null);
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
    onMouseEnterTargetTask,
    onMouseLeaveTargetTask,
  };
}
