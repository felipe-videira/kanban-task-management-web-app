import { ChangeEventHandler } from "react";
import "./TextField.scss";
import { bool, func, string } from "prop-types";

function TextField({
  name,
  className,
  label,
  defaultValue,
  error,
  errorNoMargin,
  onChange,
}: {
  name: string;
  className: string;
  label: string;
  defaultValue: string;
  error: string | null | undefined;
  errorNoMargin: boolean;
  onChange: ChangeEventHandler;
}) {
  return (
    <div className="text-field">
      {label && (
        <label htmlFor={name} className="text-field__label">
          {label}
        </label>
      )}
      <input
        type="text"
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        className={`text-field__input ${className} ${
          error ? "text-field__input--error" : ""
        }`}
      />
      {error && (
        <div
          className={`text-field__error ${
            errorNoMargin ? "text-field__error--no-margin" : ""
          }`}
        >
          {error}
        </div>
      )}
    </div>
  );
}

TextField.propTypes = {
  name: string.isRequired,
  label: string,
  className: string,
  defaultValue: string,
  error: string,
  errorNoMargin: bool,
  onChange: func,
};

TextField.defaultProps = {
  label: "",
  className: "",
  defaultValue: "",
  error: null,
  errorNoMargin: false,
  onChange: null,
};

export default TextField;
