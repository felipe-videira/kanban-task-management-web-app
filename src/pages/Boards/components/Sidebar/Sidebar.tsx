import "./Sidebar.scss";
import { arrayOf, func, shape, string } from "prop-types";
import { useMemo } from "react";
import BoardIcon from "../../../../icons/icon-board.svg?react";
import HideIcon from "../../../../icons/icon-hide-sidebar.svg?react";
import ShowIcon from "../../../../icons/icon-show-sidebar.svg?react";
import LogoIcon from "../../../../icons/logo-light.svg?react";
import ThemeToggle from "../../../../components/ThemeToggle/ThemeToggle";

function Sidebar({
  boards,
  selectedBoard,
  onSelectBoard,
  onCreateBoard,
}: {
  boards: Board[];
  selectedBoard: Board;
  onSelectBoard: (board: Board) => void;
  onCreateBoard: () => void;
}) {
  const boardsLength = useMemo(() => boards.length, [boards]);

  return (
    <div className="sidebar">
      <label htmlFor="sidebar-toggle" className="sidebar__toggle-label">
        <HideIcon className="sidebar__toggle-hide-icon" />
        <ShowIcon className="sidebar__toggle-show-icon" />

        <span className="sidebar__toggle-text">Hide sidebar</span>
      </label>

      <div className="sidebar__content">
        <LogoIcon className="sidebar__logo" />

        <div className="sidebar__opts">
          <h3 className="sidebar__opts-title">
            {boardsLength > 0 ? `All boards (${boardsLength})` : "No boards"}
          </h3>

          {boards.map((board) => (
            <button
              key={board.id}
              type="button"
              className={`sidebar__opts-btn sidebar__opts-btn--list-item ${
                selectedBoard && selectedBoard.id === board.id
                  ? "sidebar__opts-btn--selected"
                  : ""
              }`}
              onClick={() => onSelectBoard(board)}
            >
              <label
                htmlFor="sidebar-toggle"
                className="sidebar__opts-toggle-label"
              >
                <span className="sidebar__opts-board-icon">
                  <BoardIcon />
                </span>
                {board.title}
              </label>
            </button>
          ))}

          <button
            type="button"
            className="sidebar__opts-btn sidebar__opts-btn--create"
            onClick={onCreateBoard}
          >
            <BoardIcon />+ Create new board
          </button>
        </div>

        <ThemeToggle className="sidebar__theme-toggle" />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  boards: arrayOf(
    shape({
      id: string.isRequired,
      title: string.isRequired,
    })
  ).isRequired,
  selectedBoard: shape({
    id: string.isRequired,
    title: string.isRequired,
  }),
  onSelectBoard: func.isRequired,
  onCreateBoard: func.isRequired,
};

Sidebar.defaultProps = {
  selectedBoard: null,
};

export default Sidebar;
