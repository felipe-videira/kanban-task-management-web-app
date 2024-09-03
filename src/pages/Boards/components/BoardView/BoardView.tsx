import "./BoardView.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { arrayOf, shape, string } from "prop-types";
import useTaskDrag from "./hooks/useTaskDrag";
import useColumnDrag from "./hooks/useColumnDrag";

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
  } = useTaskDrag(getRef, onTaskReorder);

  const {
    selectedColumn,
    targetColumn,
    isDraggingColumn,
    handleColumnMouseUp,
    handleColumnMouseDown,
    handleColumnDrag,
    onMouseEnterTargetColumn,
    onMouseLeaveTargetColumn,
  } = useColumnDrag(getRef, onColumnReorder);

  useEffect(() => {
    document.addEventListener("mousemove", handleTaskDrag);
    document.addEventListener("mouseup", handleTaskMouseUp);

    document.addEventListener("mousemove", handleColumnDrag);
    document.addEventListener("mouseup", handleColumnMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleTaskDrag);
      document.removeEventListener("mouseup", handleTaskMouseUp);

      document.removeEventListener("mousemove", handleColumnDrag);
      document.removeEventListener("mouseup", handleColumnMouseUp);
    };
  }, [
    itemsRef,
    selectedTask,
    targetTask,
    isDraggingTask,
    selectedColumn,
    targetColumn,
    isDraggingColumn,
  ]);

  return (
    <div className="board-view">
      {data.map((column, columnIndex) => (
        <div
          key={column.id}
          className="board-view__column"
          ref={(el) => assignRef(el, column.id)}
          role="listitem"
          onMouseDown={(evt) => handleColumnMouseDown(evt, column, columnIndex)}
          onMouseEnter={() => onMouseEnterTargetColumn(columnIndex, column)}
          onMouseLeave={() => onMouseLeaveTargetColumn(column)}
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
