import { getTimestamp, headers } from "./common";
import * as config from "../config.json";
import { getToken } from "./token";
import sign from "./sign";
import { request } from "hiker-nice";

export function senlinjimoreRequest(
  path: string,
  param: { size?: number; page?: number; [propName: string]: any }
): any {
  let headers: headers = {
    "x-serverless-sign": "",
    Referer:
      "https://servicewechat.com/wx7db958b36521fe14/devtools/page-frame.html",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.3 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1 wechatdevtools/1.03.2011120 MicroMessenger/7.0.4 Language/zh_CN webview/",
    "content-type": "application/json",
  };
  let body: any = {
    method: "serverless.function.runtime.invoke",
    spaceId: config.spaceId,
    timestamp: getTimestamp(),
    token: getToken(),
  };
  body["params"] = JSON.stringify({
    functionTarget: "client",
    functionArgs: {
      path,
      param,
      token: "",
      clientInfo: {
        PLATFORM: "mp-weixin",
        OS: "devtools",
        APPID: "__UNI__C1C1000",
        CLIENT_SDK_VERSION: "1.0.0",
      },
      uniCloudClientInfo:
        "%7B%22ak%22%3A%22__UNI__C1C1000%22%2C%22p%22%3A%22i%22%2C%22ut%22%3A%22wx%22%2C%22uuid%22%3A%22nphnv6l1ptoqhsbu8hjiugc026s51v6s%22%2C%22fn%22%3A%22client%22%2C%22sid%22%3A%2280953a7e-7873-4802-9cc1-ea559e692799%22%2C%22pvd%22%3A%22a%22%7D",
    },
  });
  headers["x-serverless-sign"] = sign(body, config.clientSecret);
  return request({
    url: `${config.endpoint}/client`,
    param: {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    },
  });
}
