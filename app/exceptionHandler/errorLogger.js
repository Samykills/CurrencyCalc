// import { CrashlyticsLogger } from 'uRnFramework-firebase';
import ErrorCode from "./errorConstants";

const ErrorLogger = err => {
  let errorString = createErrorString(err);
  // CrashlyticsLogger.reportLog(errorString);
  // CrashlyticsLogger.reportError(ErrorCode.FATAL, errorString);
};

createErrorString = err => {
  return err.message + "/n" + err.stack;
};

export default ErrorLogger;
