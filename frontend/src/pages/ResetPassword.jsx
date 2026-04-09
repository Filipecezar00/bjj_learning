import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    <div
      className="auth-container"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "20px",
        }}
      >
        <h1>Nova Senha</h1>
        <div
          className="input-group"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nova Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "10px", paddingRight: "40px", width: "100%" }}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="eye-button"
            style={{
              position: "absolute",
              right: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div
          className="input-group"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirme a nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ padding: "10px", width: "100%" }}
          />
        </div>
        {error && (
          <p style={{ color: "red", fontSize: "14px", margin: "0" }}>{error}</p>
        )}
        <button
          type="submit"
          style={{
            padding: "10px",
            cursor: "pointer",
            background: "#d32f2f",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Atualizar Senha
        </button>
      </form>
    </div>
  );
}
