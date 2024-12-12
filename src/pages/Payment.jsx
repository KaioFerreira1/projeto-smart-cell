import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PedidoOverlay from "../components/PedidoOverlay";
import Overlay from "../components/Overlay";
import { useUserContext } from "../context/UserContext";
import "../components/Payment.css";

const PaymentOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const userId = user?.id;
  const cartItems = location.state?.cartItems || [];

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(false);

  const handleViewOrder = (product) => {
    setSelectedProduct(product);
    setOverlayVisible(true);
    setViewingOrder(true);
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
    setSelectedProduct(null);
    setPaymentStatus(null);
    setViewingOrder(false);
  };

  const handlePaymentMethod = async (method) => {
    if (!userId) {
      setPaymentStatus({
        type: "error",
        message: "Usuário não autenticado. Faça login para continuar.",
      });
      setOverlayVisible(true);
      return;
    }

    try {
      const success = Math.random() > 0.2;

      if (success) {
        const userResponse = await fetch(`/users/${userId}`);
        if (!userResponse.ok) {
          throw new Error("Erro ao buscar informações do usuário.");
        }
        const user = await userResponse.json();

        const purchases = user.purchases || [];
        purchases.push({
          method,
          products: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
          })),
          totalAmount: cartItems.reduce((total, item) => total + item.price, 0),
          date: new Date().toISOString(),
        });

        const updateResponse = await fetch(`/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ purchases }),
        });
        if (!updateResponse.ok) {
          throw new Error("Erro ao salvar informações de compra.");
        }

        setPaymentStatus({
          type: "success",
          message: `Pagamento com ${method} realizado com sucesso!`,
        });
      } else {
        setPaymentStatus({
          type: "error",
          message: `Erro ao processar o pagamento com ${method}. Tente novamente.`,
        });
      }
    } catch (error) {
      console.error("Erro ao processar o pagamento:", error);
      setPaymentStatus({
        type: "error",
        message: `Erro ao processar o pagamento. Detalhes: ${error.message}`,
      });
    }

    setOverlayVisible(true);
    setViewingOrder(false);
  };

  const handleFinalizeOrder = async () => {
    try {
      const success = Math.random() > 0.2;

      if (success) {
        let updatedProducts = [...cartItems];
        cartItems.forEach((item) => {
          const productIndex = updatedProducts.findIndex((p) => p.id === item.id);
          if (productIndex >= 0) {
            updatedProducts[productIndex].stock -= item.quantity;
          }
        });

        const newPurchase = {
          method: 'Pagamento Finalizado',
          products: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
          date: new Date().toISOString(),
        };

        const saveOrderResponse = await fetch(`/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPurchase),
        });

        if (!saveOrderResponse.ok) {
          throw new Error("Erro ao salvar pedido.");
        }
        
        await Promise.all(
          updatedProducts.map((product) =>
            fetch(`/products/${product.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                stock: product.stock,
              }),
            })
          )
        );

        setPaymentStatus({
          type: "success",
          message: "Compra realizada com sucesso!",
        });
      } else {
        setPaymentStatus({
          type: "error",
          message: "Houve um erro ao processar o pagamento. Tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro ao finalizar o pedido:", error);
      setPaymentStatus({
        type: "error",
        message: `Erro ao finalizar o pedido. Detalhes: ${error.message}`,
      });
    }

    setOverlayVisible(true);
    setViewingOrder(false);
  };

  return (
    <div className="payment-container">
      <Header />

      <div className="content-container">
        <div className="back-button">
          <button className="btn-back-home" onClick={() => navigate(-1)}>
            Página Inicial
          </button>
        </div>

        <div className="cart-summary">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <button
                  className="view-order-button"
                  onClick={() => handleViewOrder(item)}
                >
                  Ver Resumo do Pedido
                </button>
              </div>
            ))
          ) : (
            <p>Carrinho vazio.</p>
          )}
        </div>

        <div className="payment-method-container">
          <h2>Formas de pagamento</h2>
          <div className="payment-options">
            <button
              className="payment-button pix"
              onClick={() => handlePaymentMethod("Pix")}
            >
              <img
                src="/images/pix-image.png"
                alt="Pix"
                className="payment-icon"
              />
              Pix
            </button>
            <button
              className="payment-button card"
              onClick={() => handlePaymentMethod("Cartão")}
            >
              <img
                src="/images/card-image.png"
                alt="Cartão"
                className="payment-icon"
              />
              Cartão
            </button>
            <button
              className="payment-button boleto"
              onClick={() => handlePaymentMethod("Boleto")}
            >
              <img
                src="/images/boleto-image.png"
                alt="Boleto"
                className="payment-icon"
              />
              Boleto
            </button>
          </div>
        </div>
      </div>

      {overlayVisible && paymentStatus && !viewingOrder && (
        <Overlay
          type={paymentStatus.type}
          message={paymentStatus.message}
          onClose={handleCloseOverlay}
          onAction={handleCloseOverlay}
          actionText="Fechar"
          id="payment"
        />
      )}

      {overlayVisible && !paymentStatus && viewingOrder && (
        <PedidoOverlay
          product={selectedProduct}
          onClose={handleCloseOverlay}
          onFinalize={() => {
            handleFinalizeOrder();
            setOverlayVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default PaymentOptions;
