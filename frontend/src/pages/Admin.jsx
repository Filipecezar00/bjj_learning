import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export async function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState({
    title: "",
    url: "",
    category: "",
    level: "Iniciante",
    summary: "",
    applyTips: "",
  });

  const handleChange = (e) => {
    setVideoData({ ...videoData, [e.target.name]: e.target.value });
  };

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
  return (
    <div>
      <h1>Gestão de Vídeos - Plataforma BJJ Learning</h1>
      <form onSubmit={enviarFormulario}>
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
          <option value="Quedas">Quedas</option>
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

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando" : "Cadastrar Video"}
        </button>
      </form>
    </div>
  );
}
