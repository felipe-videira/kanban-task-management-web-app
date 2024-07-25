import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boards from "./pages/Boards/Boards";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Boards />} />
          <Route path="/:boardId" element={<Boards />} />
          <Route path="/:boardId/:taskId" element={<Boards />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
