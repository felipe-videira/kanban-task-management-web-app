import "./Sidebar.scss";
import { arrayOf, func, shape, string } from "prop-types";
import useTheme from "../../../../hooks/useTheme";
import BoardIcon from "../../../../icons/icon-board.svg?react";
import HideIcon from "../../../../icons/icon-hide-sidebar.svg?react";
import ShowIcon from "../../../../icons/icon-show-sidebar.svg?react";
import LogoIcon from "../../../../icons/logo-light.svg?react";
import LightThemeIcon from "../../../../icons/icon-light-theme.svg?react";
import DarkThemeIcon from "../../../../icons/icon-dark-theme.svg?react";

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
      <label htmlFor="sidebar-toggle" className="sidebar__toggle-label">
        <HideIcon className="sidebar__toggle-hide-icon" />
        <ShowIcon className="sidebar__toggle-show-icon" />

        <span className="sidebar__toggle-text">Hide sidebar</span>
      </label>

      <div className="sidebar__content">
        <LogoIcon className="sidebar__logo" />

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
          >
            <BoardIcon />+ Create new board
          </button>
        </div>
        <div className="sidebar__theme-toggle-container">
          <LightThemeIcon />

          <label className="sidebar__theme-toggle">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span />
          </label>

          <DarkThemeIcon />
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
