import { useCallback, useEffect, useState } from "react";
import { arrayOf, bool, func, shape, string } from "prop-types";
import Modal, { ModalTitle } from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";
import TextField from "../../../components/TextField/TextField";
import ColumnsField from "../../../components/ColumnsField/ColumnsField";

const getDefaultColumn = () => ({
  id: new Date().getTime().toString(),
  title: "",
});

function BoardFormModal({
  board,
  show,
  onClose,
}: {
  board: Board;
  show: boolean;
  onClose: () => void;
}) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [columns, setColumns] = useState<Column[]>([getDefaultColumn()]);

  const addColumn = useCallback(() => {
    setColumns([...columns, getDefaultColumn()]);
  }, [columns]);

  const reorderColumns = useCallback(
    (currentIndex: number, targetIndex: number) => {
      const column = columns[currentIndex];
      let newColumns = [
        ...columns.slice(0, currentIndex),
        ...columns.slice(currentIndex + 1),
      ];

      if (targetIndex === columns.length) {
        newColumns.push(column);
      } else if (targetIndex === 0) {
        newColumns.unshift(column);
      } else {
        newColumns = [
          ...newColumns.slice(0, targetIndex),
          column,
          ...newColumns.slice(targetIndex),
        ];
      }

      setColumns(newColumns);
    },
    [columns]
  );

  const deleteColumn = useCallback(
    (index: number) => {
      setColumns([...columns.slice(0, index), ...columns.slice(index + 1)]);
    },
    [columns]
  );

  const validateRequiredField = useCallback(
    (evt, fieldName) => {
      if (!evt.target.value) {
        setErrors({ ...errors, [fieldName]: "This field is required" });
      } else {
        delete errors[fieldName];
        setErrors({ ...errors });
      }
    },
    [errors]
  );

  const validateForm = useCallback(
    (evt) => {
      evt.preventDefault();

      let hasErrors = !(Object.keys(errors).length === 0);
      let newErrors = errors;

      if (!document.forms["boardForm"].fname.value) {
        newErrors = { ...newErrors, fname: "This field is required" };
        hasErrors = true;
      }

      Object.keys(document.forms["boardForm"].elements).forEach((key) => {
        if (key.includes("fcolumn-")) {
          if (!document.forms["boardForm"].elements[key].value) {
            const id = key.substring("fcolumn-".length);
            const index = columns.findIndex((column) => column.id === id);

            if (index !== -1) {
              newErrors = { ...newErrors, [key]: "This field is required" };
              hasErrors = true;
            }
          }
        }
      });

      setErrors(newErrors);

      if (!hasErrors) {
        document.forms["boardForm"].reset();
        setErrors({});
        setColumns([getDefaultColumn()]);
        onClose();
      }
    },
    [document.forms, errors, columns]
  );

  const onCloseBoardModal = useCallback(() => {
    document.forms["boardForm"].reset();
    setErrors({});
    setColumns([getDefaultColumn()]);
    onClose();
  }, [document.forms]);

  useEffect(() => {
    if (board?.columns) setColumns(board.columns);
  }, [board]);

  return (
    <Modal show={show} onClose={onCloseBoardModal}>
      <ModalTitle>{board?.id ? "Edit Board" : "Add new board"}</ModalTitle>

      <form name="boardForm" onSubmit={validateForm}>
        <input type="hidden" name="id" defaultValue={board?.id} />

        <TextField
          name="fname"
          label="Name"
          defaultValue={board?.title}
          onChange={(evt) => validateRequiredField(evt, "fname")}
          error={errors.fname}
        />

        <ColumnsField
          label="Columns"
          data={columns}
          errors={errors}
          onFieldChange={validateRequiredField}
          onReorder={reorderColumns}
          onDelete={deleteColumn}
        />

        <Button secondary block onClick={addColumn}>
          + Add New Column
        </Button>
        <Button type="submit" block>
          {board?.id ? "Save changes" : "Create New Board"}
        </Button>
      </form>
    </Modal>
  );
}

BoardFormModal.propTypes = {
  board: shape({
    id: string.isRequired,
    title: string.isRequired,
    columns: arrayOf(
      shape({
        id: string.isRequired,
        title: string.isRequired,
      })
    ).isRequired,
  }),
  show: bool.isRequired,
  onClose: func.isRequired,
};

BoardFormModal.defaultProps = {
  board: null,
};

export default BoardFormModal;
