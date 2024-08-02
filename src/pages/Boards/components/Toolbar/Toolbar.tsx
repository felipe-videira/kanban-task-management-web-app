import "./Toolbar.scss";
import { shape, string } from "prop-types";
import LogoIcon from "../../../../icons/logo-light.svg?react";
import LogoMobileIcon from "../../../../icons/logo-mobile.svg?react";
import ChevronIcon from "../../../../icons/icon-chevron-down.svg?react";

function Toolbar({ selectedBoard }: { selectedBoard: Board }) {
  return (
    <div className="toolbar">
      <div className="toolbar__logo-wrapper">
        <LogoIcon className="toolbar__logo " />
      </div>

      <label htmlFor="sidebar-toggle" className="toolbar__sidebar-toggle-label">
        <LogoMobileIcon className="toolbar__logo-mobile" />

        {selectedBoard && (
          <h1 className="toolbar__title">{selectedBoard.title}</h1>
        )}

        <ChevronIcon className="toolbar__chevron" />
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
