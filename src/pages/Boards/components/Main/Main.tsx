import { useCallback, useEffect, useMemo, useState } from "react";
import { arrayOf, func, shape, string } from "prop-types";
import Button from "../../../../components/Button/Button";
import "./Main.scss";
import BoardView from "../BoardView/BoardView";

const mockTasks = [
  {
    id: "1sadsdsd",
    title: "1",
    color: "",
    tasks: [
      {
        id: "1sadsd",
        title: "1",
      },
      {
        id: "2sadsddsd",
        title: "2",
      },
      {
        id: "5ssddsds",
        title: "3",
      },
    ],
  },
  {
    id: "23sdsdsd",
    title: "2",
    color: "",
    tasks: [
      {
        id: "3sdsd",
        title: "4",
      },
      {
        id: "4sadsd",
        title: "5",
      },
    ],
  },
  {
    id: "sadsad66",
    title: "3",
    color: "",
    tasks: [
      {
        id: "514s5daa",
        title: "7",
      },
      {
        id: "as4d65sad",
        title: "58",
      },
    ],
  },
];
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
  const [columns, setColumns] = useState<Column[]>([]);

  const onTaskReorder = useCallback(
    (
      selectedColumnIndex: number,
      selectedTaskIndex: number,
      targetColumnIndex: number,
      targetTaskIndex: number
    ) => {
      const newColumns = JSON.parse(JSON.stringify(columns));

      if (
        newColumns[selectedColumnIndex]?.tasks &&
        newColumns[targetColumnIndex]?.tasks
      ) {
        const task = newColumns[selectedColumnIndex].tasks[selectedTaskIndex];

        newColumns[selectedColumnIndex].tasks = [
          ...newColumns[selectedColumnIndex].tasks.slice(0, selectedTaskIndex),
          ...newColumns[selectedColumnIndex].tasks.slice(selectedTaskIndex + 1),
        ];

        const targetIndex = Math.max(
          targetColumnIndex === selectedColumnIndex &&
            selectedTaskIndex < targetTaskIndex
            ? targetTaskIndex - 1
            : targetTaskIndex,
          0
        );

        if (targetTaskIndex === columns[targetColumnIndex].tasks?.length) {
          newColumns[targetColumnIndex].tasks.push(task);
        } else if (targetIndex === 0) {
          newColumns[targetColumnIndex].tasks?.unshift(task);
        } else {
          newColumns[targetColumnIndex].tasks = [
            ...newColumns[targetColumnIndex].tasks.slice(0, targetIndex),
            task,
            ...newColumns[targetColumnIndex].tasks.slice(targetIndex),
          ];
        }

        setColumns(newColumns);
      }
    },
    [columns]
  );

  const onColumnReorder = useCallback(
    (selectedIndex, targetIndex) => {
      let newColumns = JSON.parse(JSON.stringify(columns));

      const column = newColumns[selectedIndex];

      newColumns = [
        ...newColumns.slice(0, selectedIndex),
        ...newColumns.slice(selectedIndex + 1),
      ];

      const target = Math.max(
        selectedIndex < targetIndex ? targetIndex - 1 : targetIndex,
        0
      );

      if (targetIndex === columns.length) {
        newColumns.push(column);
      } else if (target === 0) {
        newColumns.unshift(column);
      } else {
        newColumns = [
          ...newColumns.slice(0, target),
          column,
          ...newColumns.slice(target),
        ];
      }

      setColumns(newColumns);
    },
    [columns]
  );

  useEffect(() => {
    setColumns(mockTasks);
  }, []);

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

      <BoardView
        data={columns}
        onTaskReorder={onTaskReorder}
        onColumnReorder={onColumnReorder}
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
