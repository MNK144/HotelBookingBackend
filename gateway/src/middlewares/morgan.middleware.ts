import morgan from "morgan";
import logger from "utils/logger";

const stream = {
  // Use the http severity
  write: (message) => logger.http(message),
};

const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  // "combined",
  { stream }
);

export default morganMiddleware;