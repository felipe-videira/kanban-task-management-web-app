/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import "./ThemeToggle.scss";
import { bool, func, string } from "prop-types";
import LightThemeIcon from "../../icons/icon-light-theme.svg?react";
import DarkThemeIcon from "../../icons/icon-dark-theme.svg?react";

function ThemeToggle({
  theme,
  onToggleTheme,
  className,
  noBackground,
}: {
  theme: string;
  onToggleTheme: () => void;
  className: string;
  noBackground: boolean;
}) {
  return (
    <div
      className={`theme-toggle ${
        noBackground ? "theme-toggle--no-bg" : ""
      } ${className} `}
    >
      <LightThemeIcon />

      <label className="theme-toggle__switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={onToggleTheme}
        />
        <span />
      </label>

      <DarkThemeIcon />
    </div>
  );
}

ThemeToggle.propTypes = {
  theme: string.isRequired,
  onToggleTheme: func.isRequired,
  className: string,
  noBackground: bool,
};

ThemeToggle.defaultProps = {
  className: "",
  noBackground: false,
};

export default ThemeToggle;
