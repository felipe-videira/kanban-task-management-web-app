import "./ColumnsField.scss";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { arrayOf, func, object, shape, string } from "prop-types";
import TextField from "../../../../../../components/TextField/TextField";
import CrossIcon from "../../../../../../icons/icon-cross.svg?react";
import DragIcon from "../../../../../../icons/icon-drag-handle.svg?react";
import { getRandomColor } from "../../../../../../utils";

type Selected = {
  column: Column;
  index: number;
  height?: number;
  currentY?: number;
} | null;

function ColumnsField({
  data,
  label,
  errors,
  onFieldChange,
  onReorder,
  onDelete,
}: {
  data: Column[];
  label: string;
  errors: { [key: string]: string };
  onFieldChange: (evt: ChangeEvent<Element>, fieldName: string) => void;
  onReorder: (selectedIndex: number, targetIndex: number) => void;
  onDelete: (index: number) => void;
}) {
  const itemsRef = useRef<{ [key: string]: HTMLDivElement }>({});
  const [selected, setSelected] = useState<Selected>(null);
  const [target, setTarget] = useState<Selected>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDocumentMouseUp = useCallback(
    (event) => {
      if (selected && event.button === 0) {
        if (target) {
          onReorder(selected.index, target.index);

          itemsRef.current[target.column.id].style.marginTop = "0";
          itemsRef.current[target.column.id].style.marginBottom = `0`;
        }

        itemsRef.current[selected.column.id].classList.remove(
          "columns-field__item--selected"
        );
        itemsRef.current[
          selected.column.id
        ].style.transform = `translateY(0px)`;

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
          itemsRef.current[selected.column.id].getBoundingClientRect();

        itemsRef.current[selected.column.id].style.width = `${width}px`;
        itemsRef.current[selected.column.id].classList.add(
          "columns-field__item--selected"
        );

        const { y, height } =
          itemsRef.current[selected.column.id].getBoundingClientRect();

        setIsDragging(true);
        setSelected({
          ...selected,
          currentY: y,
          height,
        });
      }
    },
    [selected, itemsRef]
  );

  const handleMousePosition = useCallback(
    (event) => {
      if (selected && isDragging && selected.height && selected.currentY) {
        itemsRef.current[selected.column.id].style.transform = `translateY(${
          event.clientY - selected.currentY - selected.height / 2
        }px)`;
      }
    },
    [selected, isDragging, itemsRef]
  );

  const onMouseEnterTarget = useCallback(
    (column, index) => {
      if (isDragging && selected) {
        if (selected.index > index) {
          itemsRef.current[column.id].style.marginTop = `${selected?.height}px`;
          itemsRef.current[column.id].classList.add(
            "columns-field__item--target-up"
          );
        } else {
          itemsRef.current[
            column.id
          ].style.marginBottom = `${selected?.height}px`;
          itemsRef.current[column.id].classList.add(
            "columns-field__item--target-down"
          );
        }

        setTarget({ column, index });
      }
    },
    [selected, isDragging, itemsRef]
  );

  const onMouseLeaveTarget = useCallback(
    (column) => {
      itemsRef.current[column.id].style.marginTop = "0";
      itemsRef.current[column.id].style.marginBottom = `0`;
      itemsRef.current[column.id].classList.remove(
        "columns-field__item--target-up"
      );
      itemsRef.current[column.id].classList.remove(
        "columns-field__item--target-down"
      );
      setTarget(null);
    },
    [itemsRef]
  );

  const onMouseEnterSelected = useCallback(
    (column, index) => {
      if (!isDragging) setSelected({ column, index });
    },
    [isDragging]
  );

  const onMouseLeaveSelected = useCallback(() => {
    if (!isDragging) setSelected(null);
  }, [isDragging]);

  const assignRef = useCallback(
    (el, column) => {
      if (el) itemsRef.current[column.id] = el;
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
    <>
      <label className="columns-field__label">{label}</label>
      <div className="columns-field">
        {data.map((column, index) => (
          <div
            key={column.id}
            className="columns-field__item"
            ref={(el) => assignRef(el, column)}
            onMouseEnter={() => onMouseEnterTarget(column, index)}
            onMouseLeave={() => onMouseLeaveTarget(column)}
          >
            <div className="columns-field__color-input-wrapper">
              <input
                type="color"
                name={`fcolor-${column.id}`}
                defaultValue={getRandomColor()}
              />
            </div>
            <TextField
              name={`fcolumn-${column.id}`}
              defaultValue={column.title}
              onChange={(evt) => onFieldChange(evt, `fcolumn-${column.id}`)}
              error={errors[`fcolumn-${column.id}`]}
              errorNoMargin
            />
            <button
              type="button"
              onMouseEnter={() => onMouseEnterSelected(column, index)}
              onMouseLeave={onMouseLeaveSelected}
              className="columns-field__drag-area"
            >
              <DragIcon />
            </button>
            {index > 0 && (
              <button
                type="button"
                onClick={() => onDelete(index)}
                className="columns-field__del-btn"
              >
                <CrossIcon />
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

ColumnsField.propTypes = {
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

export default ColumnsField;
