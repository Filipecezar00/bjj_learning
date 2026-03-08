export function errorMiddleware(err, req, res, next) {
  console.error({
    message: err.message,
    stack: err.stack,
  });

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Erro interno no servidor";

  return res.status(statusCode).json({
    error: message,
  });
}
