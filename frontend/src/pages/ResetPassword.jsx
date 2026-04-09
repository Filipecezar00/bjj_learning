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

  //   const togglePasswordVisibility = () => {
  //     setShowPassword(!showPassword);
  //   };

  const isPasswordStrong = password.length >= 6;
  const doPasswordsMatch =
    password === confirmPassword && confirmPassword !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordStrong) return setError("Senha muito curta.");
    if (!doPasswordsMatch) return setError("As Senhas não coincidem.");

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
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: "5px solid #ccc",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Redefinir Senha
        </h2>
        <div style={{ position: "relative", marginBottom: "1rem" }}>
          <label style={{ fontSize: "12px", fontWeight: "bold" }}>
            Nova Senha
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "80%",
                padding: "12px",
                paddingRight: "45px",
                borderRadius: "4px",
                border: `1px solid ${isPasswordStrong ? "#4CAF50" : "#ccc"}`,
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {password && (
            <span
              style={{
                fontSize: "11px",
                color: isPasswordStrong ? "#4CAF50" : "#d32f2f",
              }}
            >
              {isPasswordStrong ? "Senha válida" : "Mínimo de 6 caracteres"}
            </span>
          )}
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontSize: "12px", fontWeight: "bold" }}>
            Confirmar Senha
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                width: "88%",
                padding: "12px",
                borderRadius: "4px",
                border: `1px solid ${doPasswordsMatch ? "#4CAF50" : "#CCC"}`,
                outline: "none",
              }}
            />
            {confirmPassword && !doPasswordsMatch && (
              <span style={{ fontSize: "11px", color: "#d32f2f" }}>
                As Senhas não coincidem
              </span>
            )}
          </label>
        </div>
        {error && (
          <p
            style={{
              color: "white",
              background: "#d32f2f",
              padding: "10px",
              borderRadius: "4px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!isPasswordStrong || !doPasswordsMatch}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          Atualizar Senha
        </button>
      </form>
    </div>
  );
}
