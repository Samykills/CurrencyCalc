import { HttpClient } from "uRnFramework-basic-components";
import Config from "react-native-config";
const httpClient = new HttpClient(Config.BASE_TAXFIX_URL, {}, 10000);
class ConversionService {
  static getRates() {
    let url = "/rates";
    return httpClient.getApi(url);
  }
}

export default ConversionService;
