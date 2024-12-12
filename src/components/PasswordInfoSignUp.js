import React from 'react';
import './Cadastro.css';

const PasswordInfo = ({ isVisible, toggleVisibility }) => (
  <div className="password-info-container">
    <img
      src="/images/info-icon.png"
      alt="Informação de senha"
      className="password-info-icon"
      onClick={toggleVisibility}
    />
    {isVisible && (
      <div className="password-info">
        Senha de no mínimo 8 caracteres
      </div>
    )}
  </div>
);

export default PasswordInfo;
