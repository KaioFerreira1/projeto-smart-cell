import React from "react";

const DeviceCard = ({ product, handleQuantityChange }) => {
  return (
    <div className="device-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="device-image"
      />
      <div className="device-info">
        <h3 className="device-name">{product.name}</h3>
        <p className="device-description">{product.brand}</p>
        <p className="device-price">R$ {product.price}</p>
        <p className="device-stock">Disponível: {product.stock}</p>
      </div>

      {/* Controles de quantidade */}
      <div className="quantity-controls">
        <span className="quantity">{product.quantity || 1}</span>
        <button
          className="quantity-btn"
          onClick={() => handleQuantityChange("increment", product.id)}
        >
          <img
            src="/images/plus.png"
            alt="Incrementar"
            className="quantity-icon-plus"
          />
        </button>
        <button
          className="quantity-btn"
          onClick={() => handleQuantityChange("decrement", product.id)}
        >
          <img
            src="/images/minus.png"
            alt="Decrementar"
            className="quantity-icon-minus"
          />
        </button>
      </div>

      <div className="device-actions">
        <button
          className="btn-primary-home"
          onClick={() => alert(`${product.quantity} unidades de ${product.name} foram adicionadas ao carrinho!`)}
        >
          <img src="/images/cart.png" alt="Carrinho" className="btn-icon" />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default DeviceCard;
