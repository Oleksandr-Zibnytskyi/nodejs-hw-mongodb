import { isHttpError } from 'http-errors';

function errorHandler(error, _req, res, _next) {
  if (isHttpError(error) === true) {
    return res.status(error.status).send({ status:error.status, message: error.message });
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: error.message,
  });
};

export { errorHandler };
