import { ChangeEventHandler } from "react";
import "./TextField.scss";
import { func, string } from "prop-types";

function TextField({
  name,
  className,
  label,
  error,
  onChange,
}: {
  name: string;
  className: string;
  label: string;
  error: string;
  onChange: ChangeEventHandler;
}) {
  return (
    <>
      <label htmlFor={name} className="text-field__label">
        {label}
      </label>
      <input
        type="text"
        name={name}
        onChange={onChange}
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
  label: string.isRequired,
  className: string,
  error: string,
  onChange: func,
};

TextField.defaultProps = {
  className: "",
  error: null,
  onChange: null,
};

export default TextField;
