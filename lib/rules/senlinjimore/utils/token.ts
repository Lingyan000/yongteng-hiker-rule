import sign from "./sign.js";
import { request } from "hiker-nice";
import * as config from "../config.json";
import { getTimestamp, headers } from "./common";

const body = {
  method: "serverless.auth.user.anonymousAuthorize",
  params: "{}",
  spaceId: config.spaceId,
  timestamp: getTimestamp(),
};

export function getToken() {
  let headers: headers = {
    "x-serverless-sign": "",
    referer:
      "https://servicewechat.com/wx7db958b36521fe14/devtools/page-frame.html",
    "user-agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.3 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1 wechatdevtools/1.03.2011120 MicroMessenger/7.0.4 Language/zh_CN webview/",
    "content-type": "application/json",
  };
  headers["x-serverless-sign"] = sign(body, config.clientSecret);
  let res: { [propName: string]: any } = request({
    url: `${config.endpoint}/client`,
    param: {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    },
  }) as object;
  return res.data.accessToken;
}
