import React from "react";
import "../components/ProductCard.css";  // Adicione o CSS se necessário

const ProductCard = ({ product }) => {
  const { name, brand, price, stock, imageUrl } = product;

  // Função para adicionar ao carrinho
  const addToCart = () => {
    if (stock > 0) {
      alert(`${name} foi adicionado ao carrinho!`);
    } else {
      alert(`Desculpe, ${name} está fora de estoque.`);
    }
  };

  return (
    <div className="device-card">
      <img
        src={imageUrl}  // URL da imagem do produto
        alt={name}
        className="device-image"
      />
      <div className="device-info">
        <h3 className="device-name">{name}</h3>
        <p className="device-description">{brand}</p>
        <p className="device-price">R$ {price}</p>
        <p className="device-stock">Estoque: {stock}</p>
      </div>
      <div className="device-actions">
        <button className="btn-primary-home" onClick={addToCart}>
          Adicionar ao Carrinho
        </button>
        <button className="btn-secondary-home">Ver Detalhes</button>
      </div>
    </div>
  );
};

export default ProductCard;
