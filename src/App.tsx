import { BrowserRouter, Routes, Route } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import Boards from "./pages/Boards/Boards";

export default function App() {
  const { theme } = useTheme();

  return (
    <div className={`${theme}-theme`}>
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
