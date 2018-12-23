import { Actions } from "react-native-router-flux";
import ErrorLogger from "./errorLogger";

const NativeErrorHandler = (e, isFatal) => {
  if (isFatal) {
    //1.log error on crashlytics
    ErrorLogger(e, isFatal);
    //2.Move to login screen i.e shutdown the module which caused error
    // Actions.replace("dashboard");
    // Actions.reset("root");
  } else {
    if (e) {
      //log error on crashlytics
      ErrorLogger(e, isFatal);
    }
  }
};

export default NativeErrorHandler;
