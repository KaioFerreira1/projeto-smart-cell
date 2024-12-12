import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../components/PasswordInfo";
import PasswordInput from "../components/PasswordInput";
import Overlay from "../components/Overlay";
import "../components/Login.css";

function Login({ login }) {
  const navigate = useNavigate();
  const [, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [overlayData, setOverlayData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      const response = await axios.get("http://localhost:3000/users", {
        params: { email, password },
      });
  
      if (response.data.length > 0) {
        const user = response.data[0];
        if (user.password === password) {
          setIsSuccess(true);
          login(user);  
          setTimeout(() => {
            navigate("/home");
          }, 1500);
        } else {
          throw new Error("Senha incorreta.");
        }
      } else {
        throw new Error("Usuário não encontrado.");
      }
    } catch (error) {
      setIsSuccess(false);
      alert(error.message || "Erro ao realizar login.");
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setOverlayData({
        type: "error",
        message: "Por favor, insira um email válido.",
        onClose: () => setOverlayData(null),
      });
      return false;
    }
    if (!password) {
      setOverlayData({
        type: "error",
        message: "A senha não pode estar vazia.",
        onClose: () => setOverlayData(null),
      });
      return false;
    }
    return true;
  };

  const redirectToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>

      <div className="login-box">
        <div className="login-left">
          <img src="/images/logo.png" alt="Logo" className="logo" />
          <p className="tagline">
            Compre seu celular com segurança e confiança, do jeito que você merece!
          </p>
        </div>

        <div className="login-right">
          <div className="form-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <FormInput
                label="E-mail"
                id="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                label="Senha"
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="form-actions">
                <button type="submit" className="btn-primary">LOGIN</button>
                <button type="button" className="btn-secondary" onClick={redirectToSignup}>
                  Cadastre-se
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {overlayData && (
        <Overlay
          type={overlayData.type}
          message={overlayData.message}
          onClose={overlayData.onClose}
          id="login"
        />
      )}
    </div>
  );
}

export default Login;