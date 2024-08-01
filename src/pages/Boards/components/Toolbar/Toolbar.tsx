import "./Toolbar.scss";
import { shape, string } from "prop-types";

function Toolbar({ selectedBoard }: { selectedBoard: Board }) {
  return (
    <div className="toolbar">
      <label htmlFor="sidebar-toggle" className="toolbar__sidebar-toggle-label">
        <img
          src="/assets/logo-mobile.svg"
          width={24}
          alt="Kanban"
          className="toolbar__logo-mobile"
        />
        {selectedBoard && (
          <h1 className="toolbar__title">{selectedBoard.title}</h1>
        )}
        <img
          src="/assets/icon-chevron-up.svg"
          width={10}
          alt="Chevron"
          className="toolbar__chevron"
        />
      </label>
    </div>
  );
}

Toolbar.propTypes = {
  selectedBoard: shape({
    id: string.isRequired,
    title: string.isRequired,
  }),
};

Toolbar.defaultProps = {
  selectedBoard: null,
};

export default Toolbar;
