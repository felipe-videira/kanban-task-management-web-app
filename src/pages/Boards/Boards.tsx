import "./Boards.scss";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
// import { useParams } from "react-router-dom";
const mockBoards = [
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
];
function Boards() {
  // const { boardId, taskId } = useParams();
  const [selectedBoard, setSelectedBoard] = useState<Board>();
  const [boards, setBoards] = useState<Board[]>([]);

  const selectBoard = useCallback((board: Board) => {
    setSelectedBoard(board);
  }, []);

  useEffect(() => {
    setBoards(mockBoards);
  }, []);

  return (
    <div className="container">
      <Sidebar
        boards={boards}
        selectedBoard={selectedBoard}
        onSelectBoard={selectBoard}
      />
      <div className="toolbar">
        <label
          htmlFor="sidebar-toggle"
          className="toolbar__sidebar-toggle-label"
        >
          <img
            src="/assets/logo-mobile.svg"
            width={24}
            alt="Kanban"
            className="toolbar__logo-mobile"
          />
          {selectedBoard && (
            <h1 className="toolbar__title">{selectedBoard.title}</h1>
          )}
        </label>
      </div>
      <div className="main" />
    </div>
  );
}

export default Boards;
