import "./Boards.scss";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Toolbar from "./components/Toolbar/Toolbar";
import { isMobile } from "../../utils";
import Modal from "../../components/Modal/Modal";
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
  const [showBoardModal, setShowBoardModal] = useState<boolean>(false);

  const selectBoard = useCallback((board: Board) => {
    setSelectedBoard(board);
  }, []);

  const addTask = useCallback(() => {}, []);
  const createBoard = useCallback(() => {
    setShowBoardModal(true);
  }, []);
  const editBoard = useCallback(() => {
    console.log("aqsjq");
    setShowBoardModal(true);
  }, []);
  const deleteBoard = useCallback(() => {}, []);

  useEffect(() => {
    // setBoards(mockBoards);
  }, []);

  return (
    <div className="container">
      <input type="checkbox" id="sidebar-toggle" defaultChecked={!isMobile()} />

      <Sidebar
        boards={boards}
        selectedBoard={selectedBoard}
        onSelectBoard={selectBoard}
      />

      <Toolbar
        selectedBoard={selectedBoard}
        onAddTask={addTask}
        onEditBoard={editBoard}
        onDeleteBoard={deleteBoard}
      />

      <Main boards={boards} onCreateBoard={createBoard} />

      <Modal show={showBoardModal}>
        <button
          type="button"
          onClick={() => {
            setShowBoardModal(false);
          }}
        >
          close
        </button>
      </Modal>
    </div>
  );
}

export default Boards;
