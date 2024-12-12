import React from "react";
import "../components/PedidoOverlay.css"; // Importe o CSS do componente

const PedidoOverlay = ({ product, onClose, onFinalize }) => {
  return (
    <div className="pedido-overlay">
      <div className="pedido-overlay-content">
        <button className="pedido-overlay-close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="pedido-overlay-title">Resumo do Pedido</h2>
        <div className="pedido-overlay-product-info">
          <img src={product.imageUrl} alt={product.name} className="pedido-overlay-product-img" />
          <div className="pedido-overlay-product-details">
            <p>{product.name}</p>
            <p>Valor unitário: R$ {product.price}</p>
            <p>Quantidade: {product.quantity}</p>
            <p>Valor total: R$ {product.price * product.quantity}</p>
          </div>
        </div>
        <button
          className="pedido-overlay-finalizar-btn"
          onClick={onFinalize} // Chama a função passada via props
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default PedidoOverlay;
