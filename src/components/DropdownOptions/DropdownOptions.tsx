import "./DropdownOptions.scss";
import { func, string } from "prop-types";
import EllipsisIcon from "../../icons/icon-vertical-ellipsis.svg?react";

function DropdownOptions({
  editText,
  deleteText,
  onEdit,
  onDelete,
}: {
  editText: string;
  deleteText: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="opts-dropdown">
      <input id="toggle-opts-dropdown" type="checkbox" />
      <label htmlFor="toggle-opts-dropdown" className="opts-dropdown__label">
        <EllipsisIcon />
      </label>
      <EllipsisIcon className="opts-dropdown__lose-focus" />
      <div className="opts-dropdown__content">
        <button type="button" onClick={onEdit}>
          {editText}
        </button>
        <button type="button" onClick={onDelete}>
          {deleteText}
        </button>
      </div>
    </div>
  );
}

DropdownOptions.propTypes = {
  editText: string.isRequired,
  deleteText: string.isRequired,
  onEdit: func.isRequired,
  onDelete: func.isRequired,
};

export default DropdownOptions;
