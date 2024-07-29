/* eslint-disable jsx-a11y/label-has-associated-control */
import { SetStateAction, useState } from "react";
import "./Boards.scss";
import useTheme from "../../hooks/useTheme";
// import { useParams } from "react-router-dom";

function Boards() {
  // const { boardId, taskId } = useParams();
  const [selectedBoard, setSelectedBoard] = useState({
    id: "1",
    title: "Platform Launch",
  });
  const [boards, setBoards] = useState([
    {
      id: "1",
      title: "Platform Launch",
    },
    {
      id: "2",
      title: "Platform Kanvan",
    },
    {
      id: "3",
      title: "Platform Daman",
    },
  ]);
  const { theme, toggleTheme } = useTheme();

  function selectBoard(board: { title: string }) {
    setSelectedBoard(board);
  }

  return (
    <div className="boards">
      <div className="boards__menu">
        <input type="checkbox" id="menu-toggle" defaultChecked />
        <label htmlFor="menu-toggle" className="boards__menu-toggle-label">
          <img
            src="/assets/icon-hide-sidebar.svg"
            alt="Hide"
            width={15}
            height={15}
            className="boards__menu-toggle-hide-icon"
          />
          <img
            src="/assets/icon-show-sidebar.svg"
            alt="Show"
            width={15}
            height={10}
            className="boards__menu-toggle-show-icon"
          />
          <span className="boards__menu-toggle-text">Hide sidebar</span>
        </label>

        <div className="boards__menu-content">
          <img
            src="/assets/logo-light.svg"
            alt="Kanban"
            width={150}
            className="boards__menu-logo --dark-theme"
          />
          <img
            src="/assets/logo-dark.svg"
            alt="Kanban"
            width={150}
            className="boards__menu-logo --light-theme"
          />

          <div className="boards__menu-opts">
            <h3 className="boards__menu-opts-title">{`All boards (${boards.length})`}</h3>
            <div className="boards__menu-opts-list">
              {boards.map((board) => (
                <button
                  type="button"
                  className={`boards__menu-opts-list-item ${
                    selectedBoard.id === board.id
                      ? "boards__menu-opts-list-item--selected"
                      : ""
                  }`}
                  onClick={() => selectBoard(board)}
                >
                  <img src="/assets/icon-board.svg" alt="Board" width={15} />
                  {board.title}
                </button>
              ))}
            </div>
            <button type="button" className="boards__menu-create-button">
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
        <h1>{selectedBoard.title}</h1>
      </div>
      <div className="boards__tasks" />
    </div>
  );
}

export default Boards;
