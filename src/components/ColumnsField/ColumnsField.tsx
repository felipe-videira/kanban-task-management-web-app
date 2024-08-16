import "./ColumnsField.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import TextField from "../TextField/TextField";
import CrossIcon from "../../icons/icon-cross.svg?react";

function ColumnsField({ data, label, onChange, onRearrange, onDelete }) {
  const itemsRef = useRef([]);

  const [selected, setSelected] = useState<{
    column: Column;
    index: number;
    currentY: number;
  } | null>(null);

  const [target, setTarget] = useState<{
    column: Column;
    index: number;
    currentY: number;
  } | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDocumentMouseUp = (event) => {
      if (selected && event.button === 0) {
        if (target) {
        }
        itemsRef.current[selected.index].style.transform = `translateY(0px)`;
        itemsRef.current[selected.index].style.position = "relative";
        itemsRef.current[selected.index].style.zIndex = "1";
        itemsRef.current[selected.index].style.pointerEvents = `all`;
        setSelected(null);
        setTarget(null);
        setIsDragging(false);
      }
    };

    const handleDocumentMouseDown = (event) => {
      if (selected && event.button === 0) {
        const { width } =
          itemsRef.current[selected.index].getBoundingClientRect();

        itemsRef.current[selected.index].style.position = "fixed";
        itemsRef.current[selected.index].style.zIndex = "99";
        itemsRef.current[selected.index].style.width = `${width}px`;
        itemsRef.current[selected.index].style.pointerEvents = `none`;

        const { y, height } =
          itemsRef.current[selected.index].getBoundingClientRect();

        setIsDragging(true);
        setSelected({
          ...selected,
          currentY: y,
          height,
        });
      }
    };

    const handleMousePosition = (event) => {
      if (selected && isDragging) {
        const offset = selected.height / 2;
        itemsRef.current[selected.index].style.transform = `translateY(${
          event.clientY - selected.currentY - offset
        }px)`;
      }
    };

    document.addEventListener("mousedown", handleDocumentMouseDown);
    document.addEventListener("mouseup", handleDocumentMouseUp);

    window.addEventListener("mousemove", handleMousePosition);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
      document.removeEventListener("mouseup", handleDocumentMouseUp);

      window.removeEventListener("mousemove", handleMousePosition);
    };
  }, [selected, isDragging, itemsRef]);

  const onMouseEnterTarget = (column, i) => {
    if (isDragging && selected?.column.id !== column.id) {
      let index = i;

      itemsRef.current[i].style.marginTop = `${selected.height}px`;

      if (target?.column.id === column.id) {
        index = i + 1;
        itemsRef.current[i].style.marginTop = "0";
        itemsRef.current[i].style.marginBottom = `${selected.height}px`;
      } else if (target) {
        itemsRef.current[target.index].style.marginTop = "0";
        itemsRef.current[target.index].style.marginBottom = `0`;
      }

      setTarget({ column, index });
    }
  };

  return (
    <div className="columns-field">
      selected: {selected?.index}
      target: {target?.index}
      {data.map((column, index) => (
        <div
          key={column.id}
          className="columns-field__item"
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          onMouseEnter={() => onMouseEnterTarget(column, index)}
        >
          <TextField
            name={`fcolumn${index}`}
            defaultValue={column.name}
            onChange={() => onChange(column, index)}
            error={column.error}
          />
          <button
            type="button"
            onMouseEnter={() => !isDragging && setSelected({ column, index })}
            onMouseLeave={() => !isDragging && setSelected(null)}
            className="columns-field__drag-area"
          >
            ::
          </button>
          <button type="button" onClick={() => onDelete(index)}>
            <CrossIcon />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ColumnsField;
