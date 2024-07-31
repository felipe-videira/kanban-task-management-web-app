/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import "./Sidebar.scss";
import { arrayOf, func, object, shape, string } from "prop-types";
import useTheme from "../../../../hooks/useTheme";
import BoardIcon from "../../../../icons/icon-board.svg?react";

function Sidebar({
  boards,
  selectedBoard,
  onSelectBoard,
}: {
  boards: Board[];
  selectedBoard: Board;
  onSelectBoard: (board: Board) => void;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="sidebar">
      <input type="checkbox" id="sidebar-toggle" defaultChecked />
      <label htmlFor="sidebar-toggle" className="sidebar__toggle-label">
        <img
          src="/assets/icon-hide-sidebar.svg"
          alt="Hide"
          width={15}
          height={15}
          className="sidebar__toggle-hide-icon"
        />
        <img
          src="/assets/icon-show-sidebar.svg"
          alt="Show"
          width={15}
          height={10}
          className="sidebar__toggle-show-icon"
        />
        <span className="sidebar__toggle-text">Hide sidebar</span>
      </label>

      <div className="sidebar__content">
        <img
          src="/assets/logo-light.svg"
          alt="Kanban"
          width={150}
          className="sidebar__logo --dark-theme"
        />
        <img
          src="/assets/logo-dark.svg"
          alt="Kanban"
          width={150}
          className="sidebar__logo --light-theme"
        />

        <div className="sidebar__opts">
          <h3 className="sidebar__opts-title">{`All boards (${boards.length})`}</h3>
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
                <BoardIcon /> {board.title}
              </label>
            </button>
          ))}
          <button
            type="button"
            className="sidebar__opts-btn sidebar__opts-btn--create"
          >
            <BoardIcon />+ Create new board
          </button>
        </div>
        <div className="sidebar__theme-toggle-container">
          <img
            src="/assets/icon-light-theme.svg"
            alt="Light theme"
            width={16}
          />
          <label className="sidebar__theme-toggle">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span />
          </label>
          <img src="/assets/icon-dark-theme.svg" alt="Dark theme" width={16} />
        </div>
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
};

Sidebar.defaultProps = {
  selectedBoard: null,
};

export default Sidebar;
