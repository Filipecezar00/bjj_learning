import { useState, useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import VideoCard from "../components/VideoCard";
import VideoPage from "./VideoPage";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { DoorOpen } from "lucide-react";
import api from "../services/api.js";
import toast from "react-hot-toast";

export function Home() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  console.log("Conteúdo do localStorage:", storedUser);
  console.log("Role do usuário atual:", user?.role);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [Categories, setCategories] = useState([]);

  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVideosAndCategories() {
      try {
        const response = await api.get("/videos");
        setVideos(response.data);

        const uniqueCategories = [
          ...new Set(response.data.map((video) => video.category)),
        ];
        setCategories(uniqueCategories);

        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar videos/categories:", error);
        toast.error("Não foi possivel carregar os videos.");
      }
    }
    fetchVideosAndCategories();
  }, []);

  const handleVideoSelect = (videoObject) => {
    console.log("Video Selecionado:", videoObject);
    setSelectedVideo(videoObject);
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    try {
      let videoId = "";

      if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
      } else if (url.includes("embed/")) {
        return url;
      } else {
        videoId = url.split("/").pop();
      }
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      console.error("Erro ao formatar URL do vídeo:", error);
      return "";
    }
  };

  async function enviarPergunta() {
    if (!question.trim()) return;
    setLoading(true);

    const contextoPrompt = `
      Você é um mestre de Jiu-jitsu faixa Preta especializado em ${
        selectedVideo.category
      },
      O aluno está assistindo ao vídeo : "${selectedVideo.title}".
      Resumo da técnica: ${selectedVideo.summary}.
      Dicas de aplicação:${selectedVideo.applyTips.join(", ")}.

      Responda á duvida do aluno de forma técnica, motivadora e focada com detalhes extremos dessa categoria
      Dúvida do aluno: ${question}
    `;

    try {
      const response = await api.post("/chat", {
        message: contextoPrompt,
        category: selectedCategory,
        videoUrl: selectedVideo,
      });

      const data = response.data;

      if (data.answer) {
        const userMsg = {
          role: "user",
          content: question,
          category: selectedCategory,
        };

        const aiMsg = {
          role: "assistant",
          content: data.answer,
          category: selectedCategory,
        };

        setChatHistory((prev) => [...prev, userMsg, aiMsg]);
        setResposta(data.answer);
      }
      setQuestion("");
    } catch (error) {
      console.error("Erro interno: " + error);
    } finally {
      setLoading(false);
    }
  }

  const handlelogout = () => {
    let resposta = confirm("Tem certeza que deseja sair?");

    if (resposta == true) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("refreshToken");
      delete api.defaults.headers.common["Authorization"];

      navigate("/login", { replace: true });
    } else {
      return false;
    }
  };
  console.log(chatHistory);
  if (selectedVideo) {
    const historicoFiltrado = chatHistory.filter(
      (msg) => msg.category === selectedCategory,
    );

    console.log("DEBUG LOGIN - Objeto Inteiro:", user);
    console.log("DEBUG LOGIN - Tipo de Role:", typeof user?.role);
    console.log("DEBUG LOGIN - Valor do Role:", user?.role);

    return (
      <VideoPage
        video={selectedVideo}
        question={question}
        setQuestion={setQuestion}
        chatHistory={historicoFiltrado}
        onBack={() => setSelectedVideo(null)}
        onAsk={() => enviarPergunta()}
        loading={loading}
        resposta={resposta}
      ></VideoPage>
    );
  }

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        <DoorOpen
          onClick={handlelogout}
          style={{ cursor: "pointer" }}
        ></DoorOpen>
        - Deslogar
      </div>
      <div
        style={{
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <h1
          style={{
            fontFamily: "math",
            marginBottom: "30px",
            textAlign: "left",
            fontSize: "2rem",
          }}
        >
          Estudos de Jiu-jitsu
        </h1>
        <div
          style={{
            margin: "10px",
            padding: "10px",
          }}
        >
          <nav>
            {user?.role === "admin" && (
              <button
                style={{
                  backgroundColor: "#d32f2f",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  gap: "1em",
                }}
                onClick={() => navigate("/admin")}
              >
                Painel Admin
              </button>
            )}
          </nav>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "10px",
              minWidth: "200px",
            }}
          >
            {Categories.map((cat) => (
              <CategoryCard
                key={cat}
                name={cat}
                active={selectedCategory === cat}
                onclick={() => setSelectedCategory(cat)}
              ></CategoryCard>
            ))}
          </div>
          <div
            style={{
              margin: "0px",
              padding: "30px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {selectedCategory && (
              <div>
                <h2 style={{ textAlign: "left", marginBottom: "20px" }}>
                  Técnicas de {selectedCategory}
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                    gap: "20px",
                  }}
                >
                  {videos
                    .filter((v) => v.category === selectedCategory)
                    .map((video) => (
                      <div key={video._id} style={{ textAlign: "left" }}>
                        <div
                          style={{
                            borderRadius: "12px",
                            overflow: "hidden",
                            backgroundColor: "#000",
                          }}
                        >
                          <iframe
                            width="100%"
                            height="200"
                            src={getEmbedUrl(video.url)}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <h3 style={{ marginTop: "10px", fontSize: "1.1rem" }}>
                          {video.title}
                        </h3>
                        <p style={{ color: "#666", fontSize: "0.9rem" }}></p>

                        <button onClick={() => handleVideoSelect(video)}>
                          Estudar Video com Treinador
                        </button>

                        <button
                          onClick={() => navigate("/favorites")}
                          style={{
                            margin: "5px",
                          }}
                        >
                          Videos Favoritados
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
