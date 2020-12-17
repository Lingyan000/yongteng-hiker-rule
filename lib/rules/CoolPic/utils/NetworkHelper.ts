import { request } from "hiker-nice";

interface DefaultRequestHeaders {
  "X-Requested-With": string;
  "X-Sdk-Int": string;
  "X-Sdk-Locale": string;
  "X-App-Id": string;
  "X-App-Version": string;
  "X-App-Code": string;
  "X-Api-Version": string;
  "X-App-Device": string;
  "X-App-Token": string;
}

export class NetworkHelper {
  readonly DEVICE_ID: string;
  constructor() {
    this.DEVICE_ID = this.getGuid();
  }
  getDefaultRequestHeaders(): DefaultRequestHeaders {
    return {
      "X-Requested-With": "XMLHttpRequest",
      "X-Sdk-Int": "28",
      "X-App-Id": "com.coolapk.market",
      "X-Sdk-Locale": "zh-CN",
      "X-App-Version": "9.2.2",
      "X-App-Code": "1905301",
      "X-Api-Version": "9",
      "X-App-Device": CryptoJS.MD5(this.DEVICE_ID).toString(),
      "X-App-Token": this.getToken(),
    };
  }
  request(url: string, param: { [propName: string]: any } = {}) {
    return request({
      url,
      param: {
        ...param,
        headers:
          (param.headers && {
            ...this.getDefaultRequestHeaders(),
            ...param.headers,
          }) ||
          this.getDefaultRequestHeaders(),
      },
    });
  }
  private getToken(): string {
    let t: number = Math.round(((new Date() as any) as number) / 1000);
    let hex_t: string = "0x" + t.toString(16);
    let md5_t: string = CryptoJS.MD5(t.toString()).toString();
    let a: string = `token://com.coolapk.market/c67ef5943784d09750dcfbb31020f0ab?${md5_t}$${this.DEVICE_ID}&com.coolapk.market`;
    let md5_a: string = CryptoJS.MD5(
      CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(a))
    ).toString();
    let token = md5_a + this.DEVICE_ID + hex_t;
    return token;
  }
  private getGuid(): string {
    function S4(): string {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }
}
