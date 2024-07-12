const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "something went wrong";
  const error = err.error || "Backend error";

  return res.status(status).json({
    success: false,
    message,
    error,
  });
};

export default errorMiddleware;
