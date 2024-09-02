import request from "./request";

export async function saveBoard(board: Board) {
  return request(
    board.id ? `/board/${board.id}` : "/board",
    board.id ? "PUT" : "POST",
    board
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
