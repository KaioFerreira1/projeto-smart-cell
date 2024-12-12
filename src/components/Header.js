import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate(); // Hook para navegação

  // Função para navegação
  const handleNavigate = (path) => {
    navigate(path); // Redireciona para o caminho desejado
  };

  return (
    <div className="header-container">
      {/* Contêiner dos ícones à esquerda */}
      <div className="header-left">
        <img
          src="/images/store-icon.png"
          alt="Loja"
          className="header-icon-left"
          onClick={() => handleNavigate('/home')} // Redireciona ao clicar
        />
        <img
          src="/images/home-icon.png"
          alt="Home"
          className="home-icon-left"
          onClick={() => handleNavigate('/home')} // Redireciona ao clicar
        />
      </div>

      {/* Campo de pesquisa */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar"
          className="search-input"
        />
        <img src="/images/search-icon.png" alt="Pesquisar" className="search-icon" />

        {/* Ícone do carrinho */}
        <div className="cart-container">
          <img src="/images/cart-icon.png" alt="Carrinho" className="header-icon" />
        </div>
        {/* Ícone de histórico */}
        <div className="history-container">
          <img src="/images/history-icon.png" alt="Historico" className="history-icon" />
        </div>
      </div>

      {/* Ícones de configurações */}
      <div className="header-icons-right">
        <img src="/images/config-icon.png" alt="Configuração" className="settings-button" />
      </div>
    </div>
  );
};

export default Header;
