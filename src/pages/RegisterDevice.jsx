import React, { useState } from "react";

const RegisterDevice = () => {
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    especificacoes: "",
    preco: "",
    quantidadeEmEstoque: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulário de aparelho registrado:", formData);
  };

  return (
    <div className="register-device-container">
      <h2>Cadastro de Aparelho Celular</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="marca">Marca</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="modelo">Modelo</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="especificacoes">Especificações</label>
          <textarea
            id="especificacoes"
            name="especificacoes"
            value={formData.especificacoes}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="preco">Preço</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="quantidadeEmEstoque">Quantidade em Estoque</label>
          <input
            type="number"
            id="quantidadeEmEstoque"
            name="quantidadeEmEstoque"
            value={formData.quantidadeEmEstoque}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default RegisterDevice;
