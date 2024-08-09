/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import "./ThemeToggle.scss";
import { bool, string } from "prop-types";
import LightThemeIcon from "../../icons/icon-light-theme.svg?react";
import DarkThemeIcon from "../../icons/icon-dark-theme.svg?react";
import useTheme from "../../hooks/useTheme";

function ThemeToggle({
  className,
  noBackground,
}: {
  className: string;
  noBackground: boolean;
}) {
  const { theme, toggleTheme } = useTheme();

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
          onChange={toggleTheme}
        />
        <span />
      </label>

      <DarkThemeIcon />
    </div>
  );
}

ThemeToggle.propTypes = {
  className: string,
  noBackground: bool,
};

ThemeToggle.defaultProps = {
  className: "",
  noBackground: false,
};

export default ThemeToggle;
