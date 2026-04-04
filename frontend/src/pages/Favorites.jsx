import { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookMarked } from "lucide-react";

export function Favorites() {
  const [favoriteVideos, setFavoriteVideos] = useState([]);
  const navigate = useNavigate();

  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("watch?v=")) {
      const id = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  useEffect(() => {
    async function loadFavorites() {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const favoriteIds = (storedUser?.favorites || []).map((id) =>
          String(id).trim(),
        );

        console.log("IDs que vou procurar:", favoriteIds);

        const response = await api.get("/videos");
        const todosOsVideos = response.data;

        console.log("Todos os Vídeos da Api: ", response.data);

        const filtered = todosOsVideos.filter((video) => {
          const videoIdNoBanco = String(video._id).trim();

          return favoriteIds.includes(videoIdNoBanco);
        });

        console.log("Vídeos que passaram no filtro:", filtered);
        setFavoriteVideos(filtered);
      } catch (error) {
        console.error("ERRO AO CARREGAR FAVORITOS: ", error);
      }
    }
    loadFavorites();
  }, []);

  return (
    <Layout>
      <div style={{ padding: "40px" }}>
        <button
          onClick={() => navigate("/home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            background: "none",
            border: "none",
            color: "white",
            marginBottom: "20px",
          }}
        >
          <ArrowLeft size={20} /> Voltar para o Início
        </button>
        <h1
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <BookMarked color="#ffd700" />
          Meus Estudos
        </h1>
        {favoriteVideos.length === 0 ? (
          <p style={{ color: "#aaa", marginTop: "20px" }}>
            Você ainda não favoritou nenhum video
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            {favoriteVideos.map((video) => (
              <div key={video._id} className="video-card">
                <h3>{video.title}</h3>
                <iframe
                  width="100%"
                  height="400"
                  src={getEmbedUrl(video.url)}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
