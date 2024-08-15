import "./Boards.scss";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Toolbar from "./components/Toolbar/Toolbar";
import Modal, { ModalTitle } from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import TextField from "../../components/TextField/TextField";
import ColumnsField from "../../components/ColumnsField/ColumnsField";
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

  const [columns, setColumns] = useState<Column[]>([
    { id: new Date().getTime().toString(), title: "" },
  ]);

  const addColumn = useCallback(() => {
    setColumns([
      ...columns,
      {
        id: new Date().getTime().toString(),
        title: "",
      },
    ]);
  }, [columns]);

  const validateColumns = useCallback((column: Column, index: number) => {},
  []);
  const rearrangeColumns = useCallback(
    (column: Column, currentIndex: number, targetIndex: number) => {},
    []
  );
  const deleteColumn = useCallback(
    (index: number) => {
      setColumns([...columns.slice(0, index), ...columns.slice(index + 1)]);
    },
    [columns]
  );

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

          <ColumnsField
            label="Columns"
            data={columns}
            onChange={validateColumns}
            onRearrange={rearrangeColumns}
            onDelete={deleteColumn}
          />

          <Button secondary block onClick={addColumn}>
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
