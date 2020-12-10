import { getToken } from "../utils/token";
import * as config from "../config.json";
import { getTimestamp, headers, HomeRuleItems } from "../utils/common";
import sign from "../utils/sign";
import { request } from "hiker-nice";
import { hiker_setError } from "hiker-nice/lib/utils/hiker";

export default function (url: string): HomeRuleItems[] {
  let albumId:string = url.replace("hiker://empty/#/", "");
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
      path: "album/get_album_image_list",
      param: {
        albumId,
      },
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
  let res: any = request({
    url: `${config.endpoint}/client`,
    param: {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    },
  });
  let data;
  try {
    data = res.data.data.imageList;
  } catch (e) {
    hiker_setError(res);
    return [];
  }
  let items: HomeRuleItems[] = [];
  data.forEach((element: any) => {
    items.push({
      title: element.name,
      img: element.detailUrl,
      desc: element.tag,
      col_type: "pic_1_full",
      url: element.originalUrl,
    });
  });
  return items;
}
