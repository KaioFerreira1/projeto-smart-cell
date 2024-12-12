import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"; // Importa o hook para navegação
import "../components/TelaCompras.css";
import PedidoOverlay from "../components/PedidoOverlay";

const TelaCompras = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAscending, setSortAscending] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate(); // Hook para navegação

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const productsWithQuantity = await fetchProducts();
        console.log(productsWithQuantity); // Verifique os dados aqui
        const productsWithQuantityUpdated = productsWithQuantity.map((product) => ({
          ...product,
          quantity: 1,
        }));
        setProducts(productsWithQuantityUpdated);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar os produtos. Tente novamente mais tarde.");
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  const handleSort = () => {
    const sortedProducts = [...products].sort((a, b) => {
      return sortAscending ? a.price - b.price : b.price - a.price;
    });
    setProducts(sortedProducts);
    setSortAscending(!sortAscending);
  };

  const addToCart = (product, quantity) => {
    if (product.stock < quantity) {
      alert(`Desculpe, não há estoque suficiente para ${product.name}.`);
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...product, quantity }]);
    }

    setSelectedProduct(product);
    setShowOverlay(true);
  };

  const handleQuantityChange = (action, productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          const newQuantity =
            action === "increment" ? product.quantity + 1 : product.quantity - 1;
          return { ...product, quantity: Math.max(newQuantity, 1) };
        }
        return product;
      })
    );
  };

  const finalizePurchase = () => {
    navigate("/payment", { state: { cartItems } }); // Redireciona para a página de pagamento com os itens do carrinho
  };

  const handleFinalizeInOverlay = () => {
    setShowOverlay(false);
    finalizePurchase(); // Chama a função para redirecionar para a página de pagamento
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <span>Carregando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="custom-home-container">
      <Header />

      <div className="custom-sort-button-container">
        <button className="custom-sort-button" onClick={handleSort}>
          {sortAscending ? "Classificar" : "Classificar"}
        </button>
      </div>

      <div className="custom-devices-list">
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((product) => (
            <div key={product.id} className="custom-device-card">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="custom-device-image"
              />
              <div className="custom-device-info">
                <h3 className="custom-device-name">{product.name}</h3>
                <p className="custom-device-description">{product.brand}</p>
                <p className="custom-device-price">R$ {product.price}</p>
                <p className="custom-device-stock">Disponível: {product.stock}</p>
              </div>

              <div className="custom-quantity-controls">
                <span className="custom-quantity">{product.quantity || 1}</span>
                <button
                  className="custom-quantity-btn"
                  onClick={() => handleQuantityChange("increment", product.id)}
                >
                  <img
                    src="/images/plus.png"
                    alt="Incrementar"
                    className="custom-quantity-icon-plus"
                  />
                </button>
                <button
                  className="custom-quantity-btn"
                  onClick={() => handleQuantityChange("decrement", product.id)}
                >
                  <img
                    src="/images/minus.png"
                    alt="Decrementar"
                    className="custom-quantity-icon-minus"
                  />
                </button>
              </div>

              <div className="custom-device-actions">
                <button
                  className="custom-btn-primary-home"
                  onClick={() => addToCart(product, product.quantity || 1)}
                >
                  <img src="/images/cart.png" alt="Carrinho" className="custom-btn-icon" />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Não há produtos disponíveis.</p>
        )}
      </div>

      <div className="custom-pagination">
        <img
          src="/images/prev.png"
          alt="Anterior"
          onClick={handlePreviousPage}
          className={currentPage > 1 ? "custom-pagination-enabled" : "custom-pagination-disabled"}
        />

        {[...Array(totalPages)].map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`custom-pagination-page ${currentPage === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </span>
        ))}

        <img
          src="/images/next.png"
          alt="Próximo"
          onClick={handleNextPage}
          className={currentPage < totalPages ? "custom-pagination-enabled" : "custom-pagination-disabled"}
        />
      </div>

      {showOverlay && (
        <PedidoOverlay
          product={selectedProduct}
          onClose={() => setShowOverlay(false)}
          onFinalize={handleFinalizeInOverlay} // Passa a função para o componente
        />
      )}
    </div>
  );
};

export default TelaCompras;
