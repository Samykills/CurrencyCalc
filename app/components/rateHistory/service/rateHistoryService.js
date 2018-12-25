import { HttpClient } from "uRnFramework-basic-components";
import Config from "react-native-config";
import moment from "moment";
const httpClient = new HttpClient(Config.BASE_GRAPH_API_URL, {}, 10000);
class RateHistoryService {
  static getRateHistory(from, to) {
    let endDate = moment(new Date()).format("YYYY-MM-DD");
    let fromDate = moment(new Date())
      .subtract(7, "days")
      .format("YYYY-MM-DD");
    let url = "convert";
    let data = {
      q: from + "_" + to,
      compact: "ultra",
      date: fromDate,
      endDate: endDate
    };
    return httpClient.getApi(url, data);
  }
}

export default RateHistoryService;
