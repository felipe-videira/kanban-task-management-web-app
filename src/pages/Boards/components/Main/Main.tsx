import { useMemo } from "react";
import { arrayOf, func, shape, string } from "prop-types";
import Button from "../../../../components/Button/Button";
import "./Main.scss";
import TaskList from "../../../../components/TaskList/TaskList";

function Main({
  boards,
  selectedBoard,
  onCreateBoard,
}: {
  boards: Board[];
  selectedBoard: Board;
  onCreateBoard: () => void;
}) {
  const boardsLength = useMemo(() => boards.length, [boards]);

  return (
    <div className="main">
      {(boardsLength === 0 || !selectedBoard) && (
        <div className="main__empty-state">
          <div className="main__empty-state-create-new">
            <h2>
              {boardsLength === 0
                ? "Create a new board to get started"
                : "Select a board to get started"}
            </h2>
            {boardsLength === 0 && (
              <Button onClick={onCreateBoard} primary>
                + Create new board
              </Button>
            )}
          </div>
        </div>
      )}

      <TaskList
        label="Columns"
        data={[
          {
            id: "1",
            title: "sadsadsad",
            color: "",
            tasks: [
              {
                id: "1",
                title: "asdsa",
              },
              {
                id: "2",
                title: "sadsad",
              },
            ],
          },
          {
            id: "2",
            title: "sda",
            color: "",
            tasks: [
              {
                id: "3",
                title: "asdsa",
              },
              {
                id: "4",
                title: "sadsad",
              },
            ],
          },
        ]}
        errors={{}}
        onFieldChange={() => {}}
        onReorder={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
}

Main.propTypes = {
  boards: arrayOf(
    shape({
      id: string.isRequired,
      title: string.isRequired,
    })
  ).isRequired,
  selectedBoard: shape({
    id: string.isRequired,
    title: string.isRequired,
  }),
  onCreateBoard: func.isRequired,
};

Main.defaultProps = {
  selectedBoard: null,
};

export default Main;
