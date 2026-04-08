import { useState } from "react";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
      setMessage(
        "Se o e-mail estiver cadastrado, você receberá um link de recuperação",
      );
    } catch (error) {
      setMessage("Erro ao processar Solicitação. Tente Novamente");
      console.error("Erro durante Processo de redefinir senha:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h1>Recuperar Senha</h1>
        <p>Digite seu e-mail para receber o link de redefinição.</p>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Link"}
        </button>
        {message && <p className="status-message">{message}</p>}
      </form>
    </div>
  );
}
