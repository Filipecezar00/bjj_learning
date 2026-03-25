import { useEffect, useRef } from "react";
import ChatMessage from "../components/ChatMessage";
export default function VideoPage({
  video,
  question,
  setQuestion,
  chatHistory,
  loading,
  error,
  onAsk,
  onBack,
}) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const videoId = url.includes("v=")
      ? url.split("v=")[1].split("&")[0]
      : url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };
  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onClick={onclick}
    >
      <h1>{video.title}</h1>
      {video.url && (
        <iframe
          width="560"
          height="315"
          src={getEmbedUrl(video.url)}
          title="Youtube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "8px", margin: "20px 0" }}
        ></iframe>
      )}

      <h3>Chat bot treinador</h3>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Digite sua Dúvida"
        style={{ width: "300px", height: "150px" }}
      />
      <button onClick={onAsk} disabled={loading || !question.trim()}>
        {loading ? "Pensando" : "Perguntar"}
      </button>
      <div style={{ marginTop: "20px" }}>
        {chatHistory &&
          chatHistory.map((msg, index) => (
            <div key={msg._id || index}>
              <ChatMessage
                type={msg.role === "user" ? "user" : "bot"}
                text={
                  msg.content ||
                  `Erro: Sem conteúdo. Categoria: ${msg.category}`
                }
              />
            </div>
          ))}

        {loading && (
          <p style={{ fontStyle: "normal", color: "#ffff" }}>
            Treinador Preparando Resposta.....
          </p>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
        <div ref={chatEndRef} />
      </div>
      <button onClick={onBack} style={{ marginTop: "20px" }}>
        Voltar para as Categorias
      </button>
    </div>
  );
}
