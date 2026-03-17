import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";
import toast from "react-hot-toast";
import api from "../services/api";

export function Login() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toast.custom(
      "Funcionalidade ainda não disponivel, tente novamente mais para frente.",
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Iniciando tentativa de:", mode);

    const endpoint =
      mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const payload =
      mode === "login" ? { email, password } : { name, email, password };

    try {
      console.log("Chamando API em:", endpoint, "Com dados:", payload);
      const response = await api.post(endpoint, payload);

      console.log("Resposta recebida com sucesso:", response.data);

      const { accessToken, refreshToken, user } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      if (user?.name) localStorage.setItem("userName", user.name);

      if (mode === "signup") {
        toast.success("Conta criada com Sucesso!");
        setMode("login");
      } else {
        toast.success("Bem vindo de Volta, Guerreiro!");
        navigate("/home");
      }
    } catch (err) {
      console.error("--- OBJETO DE ERRO COMPLETO ---");
      console.dir(err);
      setError(err.message);
      toast.error("Erro: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>BEM VINDO AO BJJ LEARNING</h2>
      <form onSubmit={handleSubmit} className="error-msg">
        <h2 style={{ color: "#ffffff" }}>
          {mode === "login"
            ? "Bem vindo"
            : mode === "signup"
            ? "Crie sua Conta"
            : "Recuperar Senha"}
        </h2>
        <p className="title">Preencha seus Dados de Cadastro</p>
        {error && <p className="error-msg">{error}</p>}
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Nome Completo"
            onChange={(e) => setName(e.target.value)}
            className="inputs"
          ></input>
        )}
        <input
          type="email"
          placeholder="Seu E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputs"
          required
        />
        <div className="password-field" style={{ position: "relative" }}>
          {mode !== "forgot" && (
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Sua Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputs"
              required
            />
          )}
          {mode !== "forgot" && (
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#ffffff",
              }}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </span>
          )}
        </div>

        <button type="submit">
          {mode === "login"
            ? "Entrar"
            : mode === "signup"
            ? "Cadastrar"
            : "Enviar E-mail"}
        </button>

        <div className="auth-links">
          {mode === "login" ? (
            <>
              <p
                onClick={() => setMode("signup")}
                style={{ cursor: "pointer", color: "#ffffff" }}
              >
                Não Possui conta? <span>Crie Cadastro</span>
              </p>
              <p
                onClick={handleForgotPassword}
                style={{ cursor: "pointer", color: "#ffffff" }}
              >
                Esqueceu a Senha?
              </p>
            </>
          ) : (
            <p
              onClick={() => setMode("login")}
              style={{ cursor: "pointer", color: "#ffffff" }}
            >
              Voltar para o <span>Login</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
