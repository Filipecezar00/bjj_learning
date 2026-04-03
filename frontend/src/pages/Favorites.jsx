import { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookMarked } from "lucide-react";

export function Favorites() {
  const [favoriteVideos, setFavoriteVideos] = useState([]);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const favoriteIds = storedUser?.favorites || [];

  useEffect(() => {
    async function loadFavorites() {
      try {
        const response = await api.get("/videos");
        const filtered = response.data.filter((video) => {
          favoriteIds.includes(video._id);
        });
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
              <div key={video._id}>
                <h3>{video.title}</h3>
                <iframe width="100%" height="200" src={video.url} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
