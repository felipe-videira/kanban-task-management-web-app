import "./Boards.scss";
import { useCallback, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
// import { useParams } from "react-router-dom";

type Board = { id: string; title: string };

function Boards() {
  // const { boardId, taskId } = useParams();
  const [selectedBoard, setSelectedBoard] = useState<Board>({
    id: "1",
    title: "Platform Launch",
  });
  const [boards, setBoards] = useState<Board[]>([
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

  const selectBoard = useCallback((board: Board) => {
    setSelectedBoard(board);
  }, []);

  return (
    <div className="container">
      <Sidebar
        boards={boards}
        selectedBoard={selectedBoard}
        onSelectboard={selectBoard}
      />
      <div className="toolbar">
        <h1>{selectedBoard.title}</h1>
      </div>
      <div className="main" />
    </div>
  );
}

export default Boards;
