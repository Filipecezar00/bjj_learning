import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";
import toast from "react-hot-toast";
import api from "../services/api";
import { Link } from "react-router-dom";

export function Login() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
    const payload =
      mode === "login" ? { email, password } : { name, email, password };

    try {
      const response = await api.post(endpoint, payload);

      const { accessToken, refreshToken, user } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      if (user?.name) localStorage.setItem("userName", user.name);

      if (mode === "signup") {
        toast.success("Conta criada com Sucesso!");
        setMode("login");
      } else {
        toast.success("Bem vindo de Volta, Guerreiro!");
        navigate("/home");
      }
    } catch (err) {
      const mensagemDeErro =
        error.response?.data?.message || "E-mail ou Senha inválidos";
      toast.error(mensagemDeErro);
      setError(mensagemDeErro);
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
              <div
                style={{
                  width: "100%",
                  textAlign: "left",
                  marginTop: "-10px",
                }}
              >
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: "12px",
                    color: "#ccc",
                    textDecoration: "none",
                    fontWeight: "bolder",
                  }}
                  className="forgot-password-link"
                >
                  Esqueceu sua Senha?
                </Link>
              </div>
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
