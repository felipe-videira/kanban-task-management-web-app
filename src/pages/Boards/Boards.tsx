import "./Boards.scss";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Toolbar from "./components/Toolbar/Toolbar";
import BoardFormModal from "./components/BoardFormModal";
import Modal, { ModalTitle } from "../../components/Modal/Modal";
import useBoard from "./hooks/useBoard";
// import { useParams } from "react-router-dom";

function Boards() {
  // const { boardId, taskId } = useParams();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const addTask = useCallback(() => {}, []);

  const onSidebarToggleChange = useCallback((evt) => {
    setShowSidebar(evt.target.checked);
  }, []);

  const onError = useCallback(() => {
    setShowErrorModal(true);
  }, []);

  const onErrorModalClose = useCallback(() => {
    setShowErrorModal(false);
  }, []);

  const {
    boards,
    selectedBoard,
    boardForEdit,
    showBoardModal,
    selectBoard,
    onCreateBoard,
    onEditBoard,
    onDeleteBoard,
    onCloseBoardModal,
    onBoardFormSubmit,
  } = useBoard(onError);

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
        onCreateBoard={onCreateBoard}
      />

      <Toolbar
        selectedBoard={selectedBoard}
        onAddTask={addTask}
        onEditBoard={onEditBoard}
        onDeleteBoard={onDeleteBoard}
      />

      <Main
        boards={boards}
        selectedBoard={selectedBoard}
        onCreateBoard={onCreateBoard}
      />

      <BoardFormModal
        show={showBoardModal}
        board={boardForEdit}
        onClose={onCloseBoardModal}
        onSubmit={onBoardFormSubmit}
      />

      <Modal show={showErrorModal} onClose={onErrorModalClose}>
        <ModalTitle className="danger--text">Error</ModalTitle>
        <p>An error has occurred, please try again later.</p>
      </Modal>
    </div>
  );
}

export default Boards;
