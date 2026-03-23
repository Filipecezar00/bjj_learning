import Video from "../models/Videos.js";

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
