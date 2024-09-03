import "./BoardView.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { arrayOf, func, shape, string } from "prop-types";
import useTask from "./hooks/useTask";

function TaskList({
  data,
  onColumnReorder,
  onTaskReorder,
}: {
  data: Column[];
  onColumnReorder: (selectedIndex: number, targetIndex: number) => void;
  onTaskReorder: (
    selectedColumnIndex: number,
    selectedTaskIndex: number,
    targetColumnIndex: number,
    targetTaskIndex: number
  ) => void;
}) {
  const itemsRef = useRef<{ [key: string]: HTMLDivElement }>({});

  const assignRef = useCallback(
    (el, id) => {
      if (el) itemsRef.current[id] = el;
    },
    [itemsRef]
  );

  const getRef = useCallback(
    (id) => {
      return itemsRef.current[id];
    },
    [itemsRef]
  );

  const {
    selectedTask,
    targetTask,
    isDraggingTask,
    handleTaskMouseUp,
    handleTaskMouseDown,
    handleTaskDrag,
    onMouseEnterSelectedTask,
    onMouseLeaveSelectedTask,
  } = useTask(getRef, onTaskReorder);

  const handleDocumentMouseUp = useCallback(
    (event) => {
      handleTaskMouseUp(event);
    },
    [selectedTask, targetTask, itemsRef]
  );

  const handleDocumentMouseDown = useCallback(
    (event) => {
      handleTaskMouseDown(event);
    },
    [selectedTask, itemsRef]
  );

  const handleMousePosition = useCallback(
    (event) => {
      handleTaskDrag(event);
    },
    [selectedTask, isDraggingTask, itemsRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentMouseDown);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("mousemove", handleMousePosition);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("mousemove", handleMousePosition);
    };
  }, [selectedTask, isDraggingTask, itemsRef, targetTask]);

  return (
    <div className="board-view">
      {data.map((column, columnIndex) => (
        <div
          key={column.id}
          className="board-view__column"
          ref={(el) => assignRef(el, column.id)}
        >
          <h4>{column.title}</h4>

          {column.tasks?.map((task, taskIndex) => (
            <div
              key={task.id}
              className="board-view__item"
              ref={(el) => assignRef(el, task.id)}
              onMouseEnter={() =>
                onMouseEnterSelectedTask(column, task, columnIndex, taskIndex)
              }
              onMouseLeave={() => onMouseLeaveSelectedTask(column, task)}
            >
              {task.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

TaskList.propTypes = {
  data: arrayOf(
    shape({
      id: string.isRequired,
      title: string,
    })
  ).isRequired,
};

export default TaskList;
