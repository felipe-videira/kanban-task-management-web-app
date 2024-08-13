import "./Boards.scss";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Toolbar from "./components/Toolbar/Toolbar";
import Modal, { ModalTitle } from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
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

  const validateForm = useCallback((evt) => {
    evt.preventDefault();
    const fields = document.forms.boardForm;
    console.log(fields.fname.required);
    if (!fields.fname.value) {
      alert("nome");
    }

    // setShowBoardModal(false);
  }, []);

  const validateRequiredField = useCallback((evt) => {
    if (!evt.target.value) {
      alert("nome 2");
    }
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

      <Modal
        show={showBoardModal}
        onClose={() => {
          setShowBoardModal(false);
        }}
      >
        <ModalTitle>Add new board</ModalTitle>

        <form name="boardForm" onSubmit={validateForm}>
          <input type="hidden" name="id" />

          <TextField
            name="fname"
            label="Name"
            onChange={validateRequiredField}
            error="This field is required"
          />

          <TextField
            name="fcolumn1"
            label="Columns"
            onChange={validateRequiredField}
          />

          <Button secondary block>
            + Add New Column
          </Button>

          <Button type="submit" block>
            Create New Board
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default Boards;
