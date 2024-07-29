/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import "./Boards.scss";
import useTheme from "../../hooks/useTheme";
// import { useParams } from "react-router-dom";

function Boards() {
  // const { boardId, taskId } = useParams();
  const [boardName, setBoardName] = useState("Platform Launch");
  const [boards, setBoards] = useState(new Array(7).fill("Projeto Kanban"));
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="boards">
      <div className="boards__sidebar">
        <input type="checkbox" id="sidebar-toggle" />
        <label
          htmlFor="sidebar-toggle"
          className="boards__sidebar-toggle-label"
        >
          <img
            src="/assets/icon-hide-sidebar.svg"
            alt="Hide"
            width={15}
            height={15}
            className="boards__sidebar-toggle-hide-icon"
          />
          <img
            src="/assets/icon-show-sidebar.svg"
            alt="Show"
            width={15}
            height={10}
            className="boards__sidebar-toggle-show-icon"
          />
          <span className="boards__sidebar-toggle-text">Hide Sidebar</span>
        </label>

        <div className="boards__sidebar-content">
          <img
            src="/assets/logo-light.svg"
            alt="Kanban"
            width={150}
            className="--dark-theme"
          />
          <img
            src="/assets/logo-dark.svg"
            alt="Kanban"
            width={150}
            className="--light-theme"
          />

          <div className="boards__sidebar-options">
            <h3 className="boards__sidebar-options-title">{`All boards (${boards.length})`}</h3>
            <ul>
              {boards.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
            <button type="button" className="boards__sidebar-create-button">
              Create new board
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="boards__theme-toggle"
            type="button"
          >
            toggle
          </button>
        </div>
      </div>

      <div className="boards__toolbar">
        <h1>{boardName}</h1>
      </div>
      <div className="boards__tasks" />
    </div>
  );
}

export default Boards;
