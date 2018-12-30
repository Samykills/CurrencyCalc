import { AppContext } from "uRnFramework-app-core";
import { AsyncStorageUtil } from "uRnFramework-basic-components";
import { Toast } from "native-base";
const historyDB = "historyDB";
class Util {
  static prepareHistory(fromCurrency, toCurrency, toConvert, convertedValue) {
    if (fromCurrency !== toCurrency) {
      let conversionName = fromCurrency + "_" + toCurrency;
      let details = Util.historyDetails(toConvert, convertedValue);
      if (details) {
        Util.recordHistory(conversionName, details);
      }
    } else {
      Toast.show({
        text: "No point in saving same currency values!",
        type: "warning"
      });
    }
  }

  static recordHistory(conversionName, conversionDetails) {
    let appContext = AppContext.getAppContext();
    let history = appContext.history;
    let conversionList = history[conversionName] ? history[conversionName] : [];
    conversionList.push(conversionDetails);
    history[conversionName] = conversionList;
    AsyncStorageUtil.set(historyDB, JSON.stringify(history)).then(
      res => {
        Toast.show({ text: "Saved", type: "success" });
      },
      err => {
        Toast.show({ text: "Save error!", type: "danger" });
      }
    );
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
    if (toConvert && convertedTo) {
      let details = {
        toConvert: toConvert,
        convertedValue: convertedTo
      };
      return details;
    }
    Toast.show({ text: "Invalid Values", type: "danger" });
  }
}

export default Util;
