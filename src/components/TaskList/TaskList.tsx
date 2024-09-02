import "./TaskList.scss";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { arrayOf, func, object, shape, string } from "prop-types";
import TextField from "../TextField/TextField";
import CrossIcon from "../../icons/icon-cross.svg?react";
import DragIcon from "../../icons/icon-drag-handle.svg?react";
import { getRandomColor } from "../../utils";

type Selected = {
  column: Column;
  task: Task;
  columnIndex: number;
  taskIndex: number;
  height?: number;
  currentY?: number;
  currentX?: number;
} | null;

function TaskList({
  data,
  onColumnReorder,
  onTaskReorder,
  onDelete,
}: {
  data: Column[];
  onColumnReorder: (selectedIndex: number, targetIndex: number) => void;
  onTaskReorder: (
    selectedColumnIndex: number,
    selectedTaskIndex: number,
    targetColumnIndex: number,
    targetTaskIndex: number
  ) => void;
  onDelete: (columnIndex: number, targetIndex: number) => void;
}) {
  const itemsRef = useRef<{ [key: string]: HTMLDivElement }>({});
  const [selected, setSelected] = useState<Selected>(null);
  const [target, setTarget] = useState<Selected>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDocumentMouseUp = useCallback(
    (event) => {
      if (selected && event.button === 0) {
        if (target) {
          onTaskReorder(
            selected.columnIndex,
            selected.taskIndex,
            target.columnIndex,
            target.taskIndex
          );

          itemsRef.current[target.task.id].style.marginTop = "0";
          itemsRef.current[target.task.id].style.marginBottom = `0`;
        }

        itemsRef.current[selected.task.id].classList.remove(
          "columns-field__item--selected"
        );
        itemsRef.current[selected.task.id].style.transform = `translate(0)`;

        setSelected(null);
        setTarget(null);
        setIsDragging(false);
      }
    },
    [selected, target, itemsRef]
  );

  const handleDocumentMouseDown = useCallback(
    (event) => {
      if (selected && event.button === 0) {
        const { width } =
          itemsRef.current[selected.task.id].getBoundingClientRect();

        itemsRef.current[selected.task.id].style.width = `${width}px`;
        itemsRef.current[selected.task.id].classList.add(
          "columns-field__item--selected"
        );

        const { y, x, height } =
          itemsRef.current[selected.task.id].getBoundingClientRect();

        setIsDragging(true);
        setSelected({
          ...selected,
          currentY: y,
          currentX: x,
          height,
        });
      }
    },
    [selected, itemsRef]
  );

  const handleMousePosition = useCallback(
    (event) => {
      if (
        selected &&
        isDragging &&
        selected.height &&
        selected.currentY &&
        selected.currentX
      ) {
        const offset = selected.height / 2;

        itemsRef.current[selected.task.id].style.transform = `translate(${
          event.clientX - selected.currentX - offset
        }px, ${event.clientY - selected.currentY - offset}px)`;
      }
    },
    [selected, isDragging, itemsRef]
  );

  const onMouseEnterSelected = useCallback(
    (column, task, columnIndex, taskIndex) => {
      if (!isDragging) {
        setSelected({ column, task, columnIndex, taskIndex });
      } else if (selected) {
        if (selected.taskIndex > taskIndex) {
          itemsRef.current[task.id].style.marginTop = `${selected?.height}px`;
          itemsRef.current[task.id].classList.add(
            "columns-field__item--target-up"
          );
        } else {
          itemsRef.current[
            task.id
          ].style.marginBottom = `${selected?.height}px`;
          itemsRef.current[task.id].classList.add(
            "columns-field__item--target-down"
          );
        }

        setTarget({ column, columnIndex, taskIndex });
      }
    },
    [selected, isDragging, itemsRef]
  );

  const onMouseLeaveSelected = useCallback(
    (column, task) => {
      if (!isDragging) {
        setSelected(null);
      } else {
        itemsRef.current[task.id].style.marginTop = "0";
        itemsRef.current[task.id].style.marginBottom = `0`;
        itemsRef.current[task.id].classList.remove(
          "columns-field__item--target-up"
        );
        itemsRef.current[task.id].classList.remove(
          "tasks-field__item--target-down"
        );
        setTarget(null);
      }
    },
    [isDragging, itemsRef]
  );

  const assignRef = useCallback(
    (el, task) => {
      if (el) itemsRef.current[task.id] = el;
    },
    [itemsRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentMouseDown);
    document.addEventListener("mouseup", handleDocumentMouseUp);

    window.addEventListener("mousemove", handleMousePosition);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
      document.removeEventListener("mouseup", handleDocumentMouseUp);

      window.removeEventListener("mousemove", handleMousePosition);
    };
  }, [selected, isDragging, itemsRef, target]);

  return (
    <div className="task-list">
      {data.map((column, columnIndex) => (
        <div className="task-list__column">
          <h4>{column.title}</h4>
          {column.tasks?.map((task, taskIndex) => (
            <div
              key={column.id}
              className="task-list__item"
              ref={(el) => assignRef(el, task)}
              onMouseEnter={() =>
                onMouseEnterSelected(column, task, columnIndex, taskIndex)
              }
              onMouseLeave={() => onMouseLeaveSelected(column, task)}
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
  label: string.isRequired,
  errors: shape({}).isRequired,
  onFieldChange: func.isRequired,
  onReorder: func.isRequired,
  onDelete: func.isRequired,
};

export default TaskList;
