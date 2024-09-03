import { useCallback, useEffect, useState } from "react";
import {
  saveBoard,
  deleteBoard as boardServiceDeleteBoard,
  getBoards,
  getBoard,
} from "../../../services/board";

export default function useBoard(
  boardId: string | undefined,
  taskId: string | undefined,
  onError: (error: unknown) => void
) {
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

  const requestBoards = useCallback(() => {
    return getBoards().then((data) => {
      setBoards(data);
    });
  }, []);

  const deleteBoard = useCallback(async () => {
    try {
      if (selectedBoard && selectedBoard.id) {
        await boardServiceDeleteBoard(selectedBoard.id);
        setSelectedBoard(undefined);
        onCloseDeleteModal();
        requestBoards();
      }
    } catch (err) {
      onError(err);
      throw err;
    }
  }, [selectedBoard]);

  const onBoardFormSubmit = useCallback(async (data) => {
    try {
      await saveBoard(data);
      onCloseBoardModal();
      requestBoards();
    } catch (err) {
      onError(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    if (boardId) {
      getBoard(boardId).then((board) => {
        setSelectedBoard(board);
      });
    }

    requestBoards();
  }, [boardId, taskId]);

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
