import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash } from "lucide-react";

export function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState({
    title: "",
    url: "",
    category: "",
    level: "Iniciante",
    summary: "",
    applyTips: "",
  });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const response = await api.get("/videos");
      setVideos(response.data);
    }
    fetchVideos();
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleDeletar(idDoVideo) {
    if (confirm("Deseja deletar o Video?")) {
      try {
        const result = await api.delete(`/videos/${idDoVideo}`);
        if (result) {
          setVideos((prev) => prev.filter((v) => v._id !== idDoVideo));
          toast.success("Video deletado com Sucesso!");
        }
      } catch (error) {
        console.error("Erro ao realizar a exclusão do video:", error);
        toast.error("Erro ao realizar a exclusão do video");
      }
    }
  }

  async function enviarFormulario(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/videos", videoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        toast.success("Video Cadastrado com Sucesso!");
        setVideoData({
          title: "",
          url: "",
          category: "",
          level: "Iniciante",
          summary: "",
          applyTips: "",
        });
      }
    } catch (error) {
      console.error("ERRO AO EXECUTAR CADASTRO", error);
      toast.error("Erro ao Cadastrar: Verifique se você é um admin");
    } finally {
      setLoading(false);
    }
  }
  const usuarioLogado = JSON.parse(localStorage.getItem("user"));

  if (!usuarioLogado || usuarioLogado.role !== "admin") {
    toast.error("Acesso Negado! Você não tem Permissão");

    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <h1>Gestão de Vídeos - Plataforma BJJ Learning</h1>
      <form
        onSubmit={enviarFormulario}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "0.5em",
        }}
      >
        <label htmlFor="title">Titulo:</label>
        <input
          type="text"
          name="title"
          value={videoData.title}
          onChange={handleChange}
        />
        <label htmlFor="url">Url do video:</label>
        <input
          type="url"
          value={videoData.url}
          onChange={handleChange}
          name="url"
        />

        <label>Categoria:</label>

        <select
          name="category"
          value={videoData.category}
          onChange={handleChange}
        >
          <option value="Finalização">Finalização</option>
          <option value="Passagem">Passagem</option>
          <option value="Guarda">Guarda</option>
          <option value="Defesa">Defesa</option>
          <option value="Queda">Queda</option>
          <option value="Drill">Drill</option>
          <option value="Rapagem">Raspagem</option>
        </select>
        <label>Nível:</label>
        <select name="level" value={videoData.level} onChange={handleChange}>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediario">Intermediario</option>
          <option value="Avançado">Avançado</option>
        </select>

        <label>Resumo técnico:</label>
        <textarea
          name="summary"
          value={videoData.summary}
          onChange={handleChange}
        ></textarea>

        <label>Dicas:</label>
        <input
          type="text"
          name="applyTips"
          value={videoData.applyTips}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading} style={{ margin: "10px" }}>
          {loading ? "Cadastrando" : "Cadastrar Video"}
        </button>
      </form>
      <button
        onClick={() => navigate("/home")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "none",
          border: "none",
          color: "#aaa",
          cursor: "pointer",
          marginBottom: "20px",
          fontSize: "1rem",
        }}
        type="button"
      >
        <ArrowLeft size={20} /> Voltar para a Vitrine
      </button>
      <h2>Gerenciar Vídeos Cadastrados</h2>
      <div className="admin-video-list">
        {videos.map((video) => (
          <div
            key={video._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span>{video.title}</span>
            <button
              onClick={() => handleDeletar(video._id)}
              style={{ color: "red" }}
            >
              <Trash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
