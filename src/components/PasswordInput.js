import React from 'react';
import './Cadastro.css';

const PasswordInput = ({ label, id, placeholder, isPasswordVisible, togglePasswordVisibility, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={id} className="form-label">{label}</label>
    <div className="password-input-container">
      <input
        type={isPasswordVisible ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        className="form-input"
        value={value} // Adicionado
        onChange={onChange} // Adicionado
      />
      <img
        src={isPasswordVisible ? "/images/eye-off-icon.png" : "/images/eye-icon.png"}
        className="password-toggle-icon"
        alt="Toggle Password Visibility"
        onClick={togglePasswordVisibility}
      />
    </div>
  </div>
);

export default PasswordInput;
