import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  console.log(
    "Secret Usada:",
    process.env.ACCESS_TOKEN_SECRET ? "OK" : "VAZIA",
  );

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ message: "Erro no Formato do token" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res
      .status(401)
      .json({ message: "Token malformatado: esquema inválido" });
  }

  const decoded = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.error("Erro na verificação Jwt", err.name);

        const message =
          err.name === "TokenExpiredError"
            ? "Token expirado"
            : "Token inválido";
        return res.status(401).json({ message });
      }
      req.userId = decoded.id;
      return next();
    },
  );
}
