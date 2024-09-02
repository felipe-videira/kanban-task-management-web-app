import { useCallback, useEffect, useState } from "react";
import {
  saveBoard,
  deleteBoard as boardServiceDeleteBoard,
  getBoards,
} from "../../../services/board";

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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

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

  const onDeleteBoard = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const onCloseDeleteModal = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  const onCloseBoardModal = useCallback(() => {
    setBoardForEdit(undefined);
    setShowBoardModal(false);
  }, []);

  const deleteBoard = useCallback(async () => {
    try {
      if (selectedBoard && selectedBoard.id) {
        await boardServiceDeleteBoard(selectedBoard.id);
        onCloseDeleteModal();
      }
    } catch (err) {
      onError(err);
      throw err;
    }
  }, []);

  const onBoardFormSubmit = useCallback(async (data) => {
    try {
      await saveBoard(data);
      onCloseBoardModal();
    } catch (err) {
      onError(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    getBoards().then((data) => {
      setBoards(data);
    });
  }, []);

  return {
    boards,
    selectedBoard,
    boardForEdit,
    showBoardModal,
    showDeleteModal,
    selectBoard,
    deleteBoard,
    onCreateBoard,
    onEditBoard,
    onDeleteBoard,
    onCloseBoardModal,
    onCloseDeleteModal,
    onBoardFormSubmit,
  };
}
