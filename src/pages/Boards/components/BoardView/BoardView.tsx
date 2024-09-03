import "./BoardView.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { arrayOf, shape, string } from "prop-types";
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
    onMouseEnterTargetTask,
    onMouseLeaveTargetTask,
  } = useTask(getRef, onTaskReorder);

  useEffect(() => {
    document.addEventListener("mousemove", handleTaskDrag);
    document.addEventListener("mouseup", handleTaskMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleTaskDrag);
      document.removeEventListener("mouseup", handleTaskMouseUp);
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
              role="listitem"
              onMouseDown={(evt) =>
                handleTaskMouseDown(evt, column, task, columnIndex, taskIndex)
              }
              onMouseEnter={() =>
                onMouseEnterTargetTask(column, columnIndex, taskIndex, task)
              }
              onMouseLeave={() => onMouseLeaveTargetTask(task)}
            >
              {task.title}
            </div>
          ))}
          <div
            key="0"
            className="board-view__item"
            ref={(el) => assignRef(el, "0")}
            onMouseEnter={() =>
              onMouseEnterTargetTask(column, columnIndex, column.tasks?.length)
            }
            onMouseLeave={() => onMouseLeaveTargetTask()}
          />
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
