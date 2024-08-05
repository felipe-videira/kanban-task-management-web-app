import "./Boards.scss";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Toolbar from "./components/Toolbar/Toolbar";
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

  const addNewTask = useCallback(() => {}, []);

  useEffect(() => {
    setBoards(mockBoards);
  }, []);

  return (
    <div className="container">
      <input type="checkbox" id="sidebar-toggle" defaultChecked />
      <Sidebar
        boards={boards}
        selectedBoard={selectedBoard}
        onSelectBoard={selectBoard}
      />
      <Toolbar selectedBoard={selectedBoard} onAddNewTask={addNewTask} />
      <Main />
    </div>
  );
}

export default Boards;
