import Video from "../models/Videos.js";
import User from "../models/User.js";

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    console.log("Erro ao Buscar Vídeos:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao buscar Vídeos" });
  }
};

export const getVideosByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const videos = await Video.find({ category: category });
    res.status(200).json(videos);
  } catch (error) {
    console.error("Erro ao buscar vídeos por categoria:", error);
    res
      .status(500)
      .json({ message: "Erro interno ao realizar a busca por videos!" });
  }
};

export const cadastrarVideo = async (req, res) => {
  try {
    const { title, url, category, level, summary, applyTips } = req.body;

    const novoVideo = await Video.create({
      title,
      url,
      category,
      level,
      summary,
      applyTips,
    });

    return res.status(201).json({
      message: "Sucesso ao adicionar Video!",
      video: novoVideo,
    });
  } catch (error) {
    console.error("ERRO DURANTE PROCESSO DE CADASTRO DO VIDEO:" + error);
    return res.status(500).send("Erro ao Cadastrar: " + error.message);
  }
};

export const deletarVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    const result = await Video.findByIdAndDelete(videoId);
    if (!result) {
      return res.status(404).send("Video indisponível!");
    } else {
      return res.status(200).send("Video Deletado com Sucesso!");
    }
  } catch (error) {
    console.error("Erro interno no servidor: " + error);
    return res.status(500).send("Erro ao deletar video");
  }
};

export const adicionarAoHistorico = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.id;

    const usuarioId = await User.findById(userId);

    if (!usuarioId) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    usuarioId.history = usuarioId.history.filter(
      (id) => String(id) !== String(videoId),
    );

    usuarioId.history.unshift(videoId);

    if (usuarioId.history.length > 20) {
      usuarioId.history.pop();
    }

    await usuarioId.save();

    return res.status(200).send("Historico salvo com Sucesso");
  } catch (error) {
    console.error("Erro ao adicionar video no historico!", error);
    return res.status(500).send("Erro ao adicionar video no historico!");
  }
};

export const obterPerfil = async (req, res) => {
  try {
    const userId = req.user.id;
    const usuario = await User.findById(userId)
      .populate({
        path: "history",
        options: { limit: 10 },
      })
      .select("-password");

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao obter Perfil:", error);
    return res.status(500).send("Erro ao salvar dados do perfil");
  }
};

