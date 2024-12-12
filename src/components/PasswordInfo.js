import React from "react";
import './Cadastro.css';
const FormInput = ({ label, id, placeholder, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      type="text"
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-input"
    />
  </div>
);

export default FormInput;

