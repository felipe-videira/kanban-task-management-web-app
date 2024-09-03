import request from "./request";

export async function saveBoard(board: Board) {
  const data = { ...board };
  delete data.id;

  if (!board.id) {
    data.columns?.forEach((column) => {
      delete column.id;
    });
  }

  return request(
    board.id ? `/board/${board.id}` : "/board",
    board.id ? "PUT" : "POST",
    data
  );
}

export async function deleteBoard(id: string) {
  return request(`/board/${id}`, "DELETE");
}

export async function getBoards() {
  return request("/board", "GET");
}

export async function getBoard(id: string) {
  return request(`/board/${id}`, "GET");
}
