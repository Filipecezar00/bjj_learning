import { useState } from "react";
import CategoryCard from "../components/CategoryCard";
import VideoCard from "../components/VideoCard";
import VideoPage from "./VideoPage";
import { videosByCategory } from "../data/videos";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { DoorOpen } from "lucide-react";

export function Home() {
  const categories = Object.keys(videosByCategory);
  const navigate = useNavigate();

  const [name, setName] = useState(() => {
    return localStorage.getItem("userName") || "guerreiro";
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);

  async function enviarPergunta() {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: question,
          video: selectedVideo,
        }),
      });
      if (response.status === 401) {
        navigate("/login");
        return;
      }
      const data = await response.json();

      if (data.answer) {
        setChatHistory((prev) => [
          ...prev,
          {
            question,
            answer: data.answer,
          },
        ]);
        setResposta(data.answer);
      }
      setQuestion("");
    } catch (error) {
      console.error("Erro interno: " + error);
    }

    setLoading(false);
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }
  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };
  if (selectedVideo) {
    return (
      <VideoPage
        video={selectedVideo}
        question={question}
        setQuestion={setQuestion}
        chatHistory={chatHistory}
        onBack={() => setSelectedVideo(null)}
        onAsk={() => enviarPergunta()}
        loading={loading}
        resposta={resposta}
      ></VideoPage>
    );
  }

  // Função com elementos e interface do Usuario

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
            fontFamily: "sans-serif",
            marginBottom: "30px",
            textAlign: "left",
            fontSize: "2rem",
          }}
        >
          Estudos de Jiu-jitsu
        </h1>
        <div className="home-container">
          <p style={{ color: "green" }}>Bem-vindo,{name}!</p>
        </div>
        <div
          style={{
            margin: "10px",
            padding: "10px",
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "10px",
              minWidth: "200px",
            }}
          >
            {categories.map((cat) => (
              <CategoryCard
                key={cat}
                name={cat}
                onclick={() => handleCategoryClick(cat)}
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
                <h2>Videos de {selectedCategory}</h2>
                {videosByCategory[selectedCategory].map((video) => (
                  <VideoCard
                    key={video.id}
                    title={video.title}
                    level={video.level}
                    onclick={() => setSelectedVideo(video)}
                  ></VideoCard>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
