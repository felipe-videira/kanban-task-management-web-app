import "./Toolbar.scss";
import { func, shape, string } from "prop-types";
import LogoIcon from "../../../../icons/logo-light.svg?react";
import LogoMobileIcon from "../../../../icons/logo-mobile.svg?react";
import ChevronIcon from "../../../../icons/icon-chevron-down.svg?react";
import AddIcon from "../../../../icons/icon-add-task-mobile.svg?react";
import Button from "../../../../components/Button/Button";
import DropdownOptions from "../../../../components/DropdownOptions/DropdownOptions";

function Toolbar({
  selectedBoard,
  onAddNewTask,
}: {
  selectedBoard: Board;
  onAddNewTask: () => void;
}) {
  return (
    <div className="toolbar">
      <div className="toolbar__logo-wrapper">
        <LogoIcon className="toolbar__logo " />
      </div>

      <label htmlFor="sidebar-toggle" className="toolbar__sidebar-toggle-label">
        <LogoMobileIcon className="toolbar__logo-mobile" />

        {selectedBoard && (
          <h1 className="toolbar__title">{selectedBoard.title}</h1>
        )}

        <ChevronIcon className="toolbar__chevron" />
      </label>
      <Button onClick={onAddNewTask} className="toolbar__add-btn">
        <span className="desktop--only">+ Add new task</span>
        <AddIcon className="mobile--only" />
      </Button>
      <DropdownOptions
        editText="Edit Board"
        deleteText="Delete Board"
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
}

Toolbar.propTypes = {
  selectedBoard: shape({
    id: string.isRequired,
    title: string.isRequired,
  }),
  onAddNewTask: func.isRequired,
};

Toolbar.defaultProps = {
  selectedBoard: null,
};

export default Toolbar;
