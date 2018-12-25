import { HttpClient } from "uRnFramework-basic-components";
import Config from "react-native-config";
import moment from "Moment";
const httpClient = new HttpClient(Config.BASE_GRAPH_API_URL, {}, 10000);
class RateHistoryService {
  static getRateHistory(from, to) {
    let endDate = moment(new Date()).format("DD/MM/YYYY");
    let fromDate = endDate.subtract(8, "days");
    let url = "convert";
    // https://free.currencyconverterapi.com/api/v6/convert?q=USD_INR&compact=ultra&date=2018-09-14&endDate=2018-09-21
    let data = {
      q: from + "_" + to,
      compac: "ultra",
      date: fromDate,
      endDate: endDate
    };
    return httpClient.getApi(url, data);
  }
}
