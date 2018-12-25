import RateHistoryService from "../service/rateHistoryService";

class RateHistoryServiceManager {
  static getRateHistory(from, to) {
    let queryData = from + "_" + to;
    return new Promise((resolve, reject) => {
      RateHistoryService.getRateHistory(from, to).then(
        res => {
          if (res.status == 200) {
            let resultDataJson = res.data[queryData];
            let graphData = [];
            for (let key in resultDataJson) {
              graphData.push({
                x: key,
                y: resultDataJson[key]
              });
            }
            resolve(graphData);
          } else {
            if (res.data) {
              reject(res.data.message);
            } else {
              reject(res.problem);
            }
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }
}

export default RateHistoryServiceManager;
