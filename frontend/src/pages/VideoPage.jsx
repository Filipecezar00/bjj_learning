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

  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>{video.title}</h1>
      <p>Nível: {video.level}</p>
      <p>
        <strong>Resumo do video: </strong>
        {video.summary}
      </p>
      <ul>
        <p>Quando aplicar:</p>
        {video.applyTips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
      <br />
      Video do Youtube <br />
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
            <div key={index}>
              <ChatMessage
                type={msg.role === "user" ? "user" : "bot"}
                text={msg.content}
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
