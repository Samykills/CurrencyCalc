import { AppContext } from "uRnFramework-app-core";
import { AsyncStorageUtil } from "uRnFramework-basic-components";
import { Toast } from "native-base";
const historyDB = "historyDB";
class Util {
  static prepareHistory(fromCurrency, toCurrency, toConvert, convertedValue) {
    if (fromCurrency !== toCurrency) {
      let conversionName = fromCurrency + "_" + toCurrency;
      let details = Util.historyDetails(toConvert, convertedValue);
      Util.recordHistory(conversionName, details);
    }
  }

  static recordHistory(conversionName, conversionDetails) {
    let appContext = AppContext.getAppContext();
    let history = appContext.history;
    let conversionList = history[conversionName] ? history[conversionName] : [];
    conversionList.push(conversionDetails);
    history[conversionName] = conversionList;
    AsyncStorageUtil.set(historyDB, JSON.stringify(history));
  }

  static initalizeHistory() {
    AsyncStorageUtil.get(historyDB).then(
      res => {
        if (res) {
          let appContext = AppContext.getAppContext();
          appContext.history = JSON.parse(res);
          AppContext.setAppContext(appContext);
        }
      },
      err => {
        Toast.show({ text: "Unable to load history" });
      }
    );
  }

  static historyDetails(toConvert, convertedTo) {
    let details = {
      toConvert: toConvert,
      convertedValue: convertedTo
    };
    return details;
  }
}

export default Util;
