import { env } from '../config/env.js';

export const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  if (err.code === 11000) {
    status = 409;
    message = 'That value is already in use';
  }
  if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid id';
  }

  if (status === 500) console.error(err);

  res.status(status).json({
    message,
    details: err.details || undefined,
    stack: env.nodeEnv === 'development' && status === 500 ? err.stack : undefined,
  });
};
