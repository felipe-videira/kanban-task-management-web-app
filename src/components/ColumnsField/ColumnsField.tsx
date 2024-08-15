import "./ColumnsField.scss";
import { useCallback, useEffect, useState } from "react";
import TextField from "../TextField/TextField";
import CrossIcon from "../../icons/icon-cross.svg?react";

function ColumnsField({ data, label, onChange, onRearrange, onDelete }) {
  const [selected, setSelected] = useState<{
    column: Column;
    index: number;
  } | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDocumentMouseUp = (event) => {
      if (selected && event.button === 0) {
        console.log("aqui 2");
        setSelected(null);
        setIsDragging(false);
      }
    };

    const handleDocumentMouseDown = (event) => {
      if (selected && event.button === 0) {
        console.log({ x: event.clientX, y: event.clientY });
        console.log("drag");
        setIsDragging(true);
      }
    };

    const handleMousePosition = (event) => {
      const pos = { x: event.clientX, y: event.clientY };
      if (selected && isDragging) {
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
  }, [selected]);

  return (
    <div className="columns-field">
      {selected?.index}
      {data.map((column, index) => (
        <div key={column.id} className="columns-field__item">
          <TextField
            name={`fcolumn${index}`}
            defaultValue={column.name}
            onChange={() => onChange(column, index)}
            error={column.error}
          />
          <button
            type="button"
            onMouseEnter={() => setSelected({ column, index })}
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
