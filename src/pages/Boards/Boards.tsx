import "./Boards.scss";
import { useParams } from "react-router-dom";

function Boards() {
  const { boardId, taskId } = useParams();

  return (
    <div className="board-menu">
      {boardId} / {taskId}
    </div>
  );
}

export default Boards;
