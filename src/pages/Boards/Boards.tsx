/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import "./Boards.scss";
import useTheme from "../../hooks/useTheme";
// import { useParams } from "react-router-dom";

function Boards() {
  // const { boardId, taskId } = useParams();
  const [boardName, setBoardName] = useState("Platform Launch");
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="boards">
      <div className="boards__sidebar">
        <input type="checkbox" id="sidebar-toggle" />
        <label
          htmlFor="sidebar-toggle"
          className="boards__sidebar-toggle-label"
        >
          Hide Sidebar
        </label>

        <div className="boards__sidebar-content">
          {/* <p>All boards (3)</p> */}
          <ul className="boards__sidebar-options">
            <li>Projeto Kanban</li>
            <li>Projeto Mandan</li>
            <li>Projeto Gandan</li>
          </ul>

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
