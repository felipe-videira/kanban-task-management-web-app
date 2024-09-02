import { useCallback, useEffect, useState } from "react";

const mockBoards = [
  {
    id: "1",
    title: "Platform Launch",
    columns: [
      {
        id: new Date().getTime().toString(),
        title: "sdsd",
      },
    ],
  },
  {
    id: "2",
    title: "Platform Kanvan",
    columns: [
      {
        id: new Date().getTime().toString(),
        title: "sdsd",
      },
    ],
  },
  {
    id: "3",
    title: "Platform Daman",
    columns: [
      {
        id: new Date().getTime().toString(),
        title: "sdsd",
      },
    ],
  },
];

export default function useBoard(onError: (error: unknown) => void) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board>();
  const [boardForEdit, setBoardForEdit] = useState<Board>();
  const [showBoardModal, setShowBoardModal] = useState<boolean>(false);

  const selectBoard = useCallback((board: Board) => {
    setSelectedBoard(board);
  }, []);

  const onCreateBoard = useCallback(() => {
    setShowBoardModal(true);
  }, []);

  const onEditBoard = useCallback(() => {
    setBoardForEdit(selectedBoard);
    setShowBoardModal(true);
  }, [selectedBoard]);

  const onDeleteBoard = useCallback(() => {}, []);

  const onCloseBoardModal = useCallback(() => {
    setBoardForEdit(undefined);
    setShowBoardModal(false);
  }, []);

  const onBoardFormSubmit = useCallback((data) => {
    try {
      console.log(data);
      onCloseBoardModal();
    } catch (err) {
      onError(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    setBoards(mockBoards);
  }, []);

  return {
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
  };
}
