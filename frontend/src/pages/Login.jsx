import { useState } from "react";
import "./Login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Falha na autenticação");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("token", JSON.stringify(data.user));

      window.location.href = "/chat";
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="login-container">
      <h2>BEM VINDO AO BJJ LEARNING</h2>
      <form onSubmit={handleLogin} className="error-msg">
        {error && <p className="error-msg">{error}</p>}
        <input
          type="email"
          placeholder="Seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputs"
          required
        />
        <input
          type="password"
          placeholder="Sua Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputs"
          required
        />
        <button type="submit">Entrar na Plataforma</button>
      </form>
    </div>
  );
}
