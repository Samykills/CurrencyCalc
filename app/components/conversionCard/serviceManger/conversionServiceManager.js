import ConversionService from "../service/conversionService";
class ConversionServiceManager {
  static getRates() {
    return new Promise((resolve, reject) => {
      ConversionService.getRates().then(
        res => {
          if (res.status == 200) {
            resolve(res.data);
          } else {
            if (res.data) {
              reject(res.data.message);
            } else {
              reject(res.problem);
            }
          }
        },
        err => {
          reject(res);
        }
      );
    });
  }
}

export default ConversionServiceManager;
