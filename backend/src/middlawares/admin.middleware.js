import User from "../models/User.js";
export default async function verificarAdmin(req, res, next) {
  try {
    const usuario_id = req.userId;
    const user = await User.findById(usuario_id);

    if (user && user.role == "admin") {
      return next();
    } else {
      return res.status(403).send("Erro: Acesso Restrito a administradores");
    }
  } catch (error) {
    console.error(
      "Erro durante processamento de dados do middleware: " + error,
    );
    return res.status(500).send("Erro interno no Servidor");
  }
}
