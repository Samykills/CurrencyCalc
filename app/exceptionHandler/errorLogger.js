import ErrorCode from "./errorConstants";

const ErrorLogger = err => {
  let errorString = createErrorString(err);
};

createErrorString = err => {
  return err.message + "/n" + err.stack;
};

export default ErrorLogger;
