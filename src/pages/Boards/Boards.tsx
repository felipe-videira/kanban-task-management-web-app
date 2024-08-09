import "./Boards.scss";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Toolbar from "./components/Toolbar/Toolbar";
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
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const selectBoard = useCallback((board: Board) => {
    setSelectedBoard(board);
  }, []);

  const createBoard = useCallback(() => {
    setShowBoardModal(true);
  }, []);

  const editBoard = useCallback(() => {
    setShowBoardModal(true);
  }, []);

  const deleteBoard = useCallback(() => {}, []);

  const addTask = useCallback(() => {}, []);

  const onSidebarToggleChange = useCallback((evt) => {
    setShowSidebar(evt.target.checked);
  }, []);

  useEffect(() => {
    setBoards(mockBoards);
  }, []);

  useEffect(() => {
    setShowSidebar(boards.length > 0);
  }, [boards]);

  return (
    <div className="container">
      <input
        type="checkbox"
        id="sidebar-toggle"
        checked={showSidebar}
        onChange={onSidebarToggleChange}
      />

      <Sidebar
        boards={boards}
        selectedBoard={selectedBoard}
        onSelectBoard={selectBoard}
        onCreateBoard={createBoard}
      />

      <Toolbar
        selectedBoard={selectedBoard}
        onAddTask={addTask}
        onEditBoard={editBoard}
        onDeleteBoard={deleteBoard}
      />

      <Main
        boards={boards}
        selectedBoard={selectedBoard}
        onCreateBoard={createBoard}
      />

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
