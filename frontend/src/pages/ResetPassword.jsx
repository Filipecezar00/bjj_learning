import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return setError("A senha deve ter no mínimo 6 caracteres");
    }
    if (password !== confirmPassword) {
      return setError("As senhas não coincidem.");
    }
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      alert("Senha alterada com sucesso! Faça login agora.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Link expirado ou inválido.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h1>Nova Senha</h1>
        <input
          type="password"
          placeholder="Nova Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirme a nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && (
          <p className="error-message" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <button type="submit">Atualizar Senha</button>
      </form>
    </div>
  );
}
