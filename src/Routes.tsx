import {
  BrowserRouter,
  Routes as ReactRouterDomRoutes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";

function Routes() {
  return (
    <BrowserRouter>
      <ReactRouterDomRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/:gameName" element={<Game />} />
      </ReactRouterDomRoutes>
    </BrowserRouter>
  );
}

export default Routes;
