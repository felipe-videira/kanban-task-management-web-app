import "./ColumnsField.scss";
import { useEffect, useRef, useState } from "react";
import TextField from "../TextField/TextField";
import CrossIcon from "../../icons/icon-cross.svg?react";

function ColumnsField({ data, label, onFieldChange, onReorder, onDelete }) {
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
          onReorder(selected.index, target.index);
          itemsRef.current[target.id].style.marginTop = "0";
          itemsRef.current[target.id].style.marginBottom = `0`;
        }
        itemsRef.current[
          selected.column.id
        ].style.transform = `translateY(0px)`;
        itemsRef.current[selected.column.id].style.position = "relative";
        itemsRef.current[selected.column.id].style.zIndex = "1";
        itemsRef.current[selected.column.id].style.pointerEvents = `all`;
        itemsRef.current[selected.column.id].style.marginTop = "0";
        itemsRef.current[selected.column.id].style.marginBottom = `0`;
        setSelected(null);
        setTarget(null);
        setIsDragging(false);
      }
    };

    const handleDocumentMouseDown = (event) => {
      if (selected && event.button === 0) {
        const { width } =
          itemsRef.current[selected.column.id].getBoundingClientRect();

        itemsRef.current[selected.column.id].style.position = "fixed";
        itemsRef.current[selected.column.id].style.zIndex = "99";
        itemsRef.current[selected.column.id].style.width = `${width}px`;
        itemsRef.current[selected.column.id].style.pointerEvents = `none`;

        const { y, height } =
          itemsRef.current[selected.column.id].getBoundingClientRect();

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
        itemsRef.current[selected.column.id].style.transform = `translateY(${
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
  }, [selected, isDragging, itemsRef, target]);

  const onMouseEnterTarget = (id, i) => {
    if (isDragging) {
      itemsRef.current[id].style.marginTop = `${selected.height}px`;

      setTarget({ id, index: i });
    }
  };

  const onMouseLeaveTarget = (id, i) => {
    itemsRef.current[id].style.marginTop = "0";
    itemsRef.current[id].style.marginBottom = `0`;
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
            itemsRef.current[column.id] = el;
          }}
          onMouseEnter={() => onMouseEnterTarget(column.id, index)}
          onMouseLeave={() => onMouseLeaveTarget(column.id, index)}
        >
          <TextField
            name={`fcolumn${index}`}
            defaultValue={column.title}
            onChange={() => onFieldChange(column, index)}
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
      <div
        className="columns-field__item"
        style={{ height: "20px" }}
        ref={(el) => {
          itemsRef.current[0] = el;
        }}
        onMouseEnter={() => onMouseEnterTarget(0, data.length)}
        onMouseLeave={() => onMouseLeaveTarget(0, data.length)}
      />
    </div>
  );
}

export default ColumnsField;
