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
      <div className="boards__menu">
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="boards__menu__toggle-label">
          Hide Sidebar
        </label>

        <button
          onClick={toggleTheme}
          className="boards__menu__theme-toggle"
          type="button"
        >
          toggle
        </button>

        <ul className="boards__menu__list">
          <li>Projeto Kanban</li>
          <li>Projeto Mandan</li>
          <li>Projeto Gandan</li>
        </ul>
      </div>

      <div className="boards__toolbar">
        <h1>{boardName}</h1>
      </div>
      <div className="boards__tasks" />
    </div>
  );
}

export default Boards;
