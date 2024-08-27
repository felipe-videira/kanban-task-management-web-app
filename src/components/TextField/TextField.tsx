import { ChangeEventHandler } from "react";
import "./TextField.scss";
import { func, string } from "prop-types";

function TextField({
  name,
  className,
  label,
  defaultValue,
  error,
  onChange,
}: {
  name: string;
  className: string;
  label: string;
  defaultValue: string;
  error: string;
  onChange: ChangeEventHandler;
}) {
  return (
    <>
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
      {error && <div className="text-field__error">{error}</div>}
    </>
  );
}

TextField.propTypes = {
  name: string.isRequired,
  label: string,
  className: string,
  defaultValue: string,
  error: string,
  onChange: func,
};

TextField.defaultProps = {
  label: "",
  className: "",
  defaultValue: "",
  error: null,
  onChange: null,
};

export default TextField;
