import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormInput from "../components/PasswordInfo";
import PasswordInput from '../components/PasswordInput';
import PasswordInfo from "../components/PasswordInfoSignUp";
import Overlay from '../components/Overlay';
import '../components/Cadastro.css';

function Cadastro() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordInfoVisible, setIsPasswordInfoVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [overlay, setOverlay] = useState(null);
  const overlayId = 'signup';

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const togglePasswordInfoVisibility = () => setIsPasswordInfoVisible((prev) => !prev);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setOverlay({
        type: 'error',
        message: 'Por favor, preencha todos os campos.',
        onClose: () => setOverlay(null),
        id: overlayId,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setOverlay({
        type: 'error',
        message: 'Por favor, insira um email válido.',
        onClose: () => setOverlay(null),
        id: overlayId,
      });
      return;
    }

    if (formData.password.length < 8) {
      setOverlay({
        type: 'error',
        message: 'A senha deve ter pelo menos 8 caracteres.',
        onClose: () => setOverlay(null),
        id: overlayId,
      });
      return;
    }

    try {
      const checkEmail = await axios.get(`http://localhost:3000/users?email=${formData.email}`);
      if (checkEmail.data.length > 0) {
        setOverlay({
          type: 'error',
          message: 'Este e-mail já está cadastrado!',
          onClose: () => setOverlay(null),
          id: overlayId,
        });
        return;
      }

      await axios.post("http://localhost:3000/users", formData);
      setOverlay({
        type: 'success',
        message: 'Usuário cadastrado com sucesso!',
        onAction: () => navigate('/'),
        actionText: 'LOGIN',
        id: overlayId,
      });
      setFormData({ name: '', email: '', password: '' });

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setOverlay({
        type: 'error',
        message: 'Erro ao cadastrar usuário. Tente novamente.',
        onClose: () => setOverlay(null),
        id: overlayId,
      });
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-header">Cadastre-se</h2>

      <div className="signup-box">
        <div className="signup-left">
          <img src="/images/logo.png" alt="SmartCell Logo" className="logo" />
          <p className="tagline">
            Compre seu celular com segurança e confiança, do jeito que você merece!
          </p>
        </div>

        <div className="signup-right">
          <div className="form-container">
            <form className="signup-form" onSubmit={handleSubmit}>
              <FormInput
                label="Nome Completo"
                id="name"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={handleChange}
              />
              <FormInput
                label="E-mail"
                id="email"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={handleChange}
              />
              <PasswordInput
                label="Senha"
                id="password"
                placeholder="Digite sua senha"
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
                value={formData.password}
                onChange={handleChange}
              />
              <PasswordInfo
                isVisible={isPasswordInfoVisible}
                toggleVisibility={togglePasswordInfoVisibility}
              />

              <div className="form-actions">
                <button type="submit" className="btn-primary">Cadastrar</button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate('/')}
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {overlay && (
        <Overlay
          type={overlay.type}
          message={overlay.message}
          onClose={overlay.onClose}
          onAction={overlay.onAction}
          actionText={overlay.actionText}
          id={overlay.id}
        />
      )}
    </div>
  );
}

export default Cadastro;
