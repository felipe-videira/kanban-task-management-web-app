import { useMemo } from "react";
import { arrayOf, func, shape, string } from "prop-types";
import Button from "../../../../components/Button/Button";
import ThemeToggle from "../../../../components/ThemeToggle/ThemeToggle";
import "./Main.scss";

function Main({
  onCreateBoard,
  boards,
}: {
  boards: Board[];
  onCreateBoard: () => void;
}) {
  const boardsLength = useMemo(() => boards.length, [boards]);

  return (
    <div className="main">
      {boardsLength === 0 && (
        <div className="main__empty-state">
          <div className="main__empty-state-create-new">
            <h2>Create a new board to get started</h2>
            <Button onClick={onCreateBoard} primary>
              + Create new board
            </Button>
          </div>
          <ThemeToggle noBackground />
        </div>
      )}
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
  onCreateBoard: func.isRequired,
};

export default Main;
