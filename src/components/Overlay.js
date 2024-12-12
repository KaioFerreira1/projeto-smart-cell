import React from 'react';
import './Overlay.css';

const Overlay = ({ type, message, onClose, onAction, actionText, id }) => {
  return (
    <div className={`overlay-container overlay-${id}`}>
      <div className={`overlay-box ${type === 'success' ? 'success' : 'error'}`}>
        <div className="overlay-header">
          <img
            src={`/images/${type === 'success' ? 'success-icon.png' : 'error-icon.png'}`}
            alt={type === 'success' ? 'Ícone de sucesso' : 'Ícone de erro'}
            className="overlay-icon"
          />
        </div>
        <div className="overlay-body">
          <h3>{type === 'success' ? 'SUCESSO!' : 'ERRO!'}</h3>
          <p>{message}</p>
        </div>
        <div className="overlay-footer">
          {type === 'success' ? (
            <button onClick={onAction} className="btn-primary">
              {actionText || 'LOGIN'}
            </button>
          ) : (
            <button onClick={onClose} className="btn-secondary">
              FECHAR
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
