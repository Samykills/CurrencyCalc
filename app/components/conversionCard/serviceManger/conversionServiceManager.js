import ConversionService from "../service/conversionService";
class ConversionServiceManager {
  static getRates() {
    return new Promise((resolve, reject) => {
      ConversionService.getRates().then(
        res => {
          if (res.status) {
            resolve(res.data);
          } else {
            reject(res);
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
