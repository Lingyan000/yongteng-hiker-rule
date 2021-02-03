import { $http } from "hiker-nice";
import { isObject } from "hiker-nice/lib/http/helpers/util";
import { HomeRuleItem } from "../../../utils/common";
import { KinhDownload } from "../code/KinhDownload";
declare function parseDomForHtml(html: string, choose: string): string;
declare function parseDomForArray(html: string, choose: string): string[];

export function OpenDir(
  path: string,
  pwd: string,
  share_id: string,
  uk: string,
  surl: string,
  randsk: string,
  pass: string
): void {
  let _KinhDownload = new KinhDownload();
  let res = _KinhDownload.openDir(path, pwd, share_id, uk, surl, randsk, pass);
  setHomeResult({ data: _KinhDownload.parsingList(res.data) });
}

export function video_dl(
  fs_id: string,
  randsk: string,
  share_id: string,
  uk: string,
  filesize: string,
  pass: string
): string {
  let _KinhDownload = new KinhDownload();
  let res: any = {};
  try {
    res = _KinhDownload.dl(fs_id, randsk, share_id, uk, filesize, pass);
  } catch (e) {
    return `toast://${e.message}`;
  }
  if (isObject(res.data))
    if (!!res.data.dlink && !!res.data.ua) {
      let dlinkRes: any = {};
      try {
        dlinkRes = $http.get(res.data.dlink, {
          headers: {
            "User-Agent": res.data.ua,
          },
          redirect: false,
        });
      } catch (e) {
        if (e.message == "Request failed with status code -1")
          return "toast://请求超时，可尝试重新获取";
        return "toast://未获取到地址，可尝试重新获取";
      }
      return (
        (dlinkRes.headers.location[0] &&
          `${
            dlinkRes.headers.location[0]
          }&hiker_type=.mp4;{User-Agent@${res.data.ua.replace(
            /;/g,
            "%%"
          )}.js:input.replace(\/%%\/g,"；；")}`) ||
        "toast://未获取到地址，可尝试重新获取"
      );
    } else return "toast://未获取到地址，可尝试重新获取";
  else {
    let pArr = parseDomForArray(res.data, ".alert-primary&&p");
    let dlink: string = "";
    let ua: string = "";
    pArr.forEach((p) => {
      if (p.indexOf("下载参数") !== -1) {
        let aria2c = parseDomForHtml(p, "b&&Text");
        let dlinkM = aria2c.match(/"(.*?)"/)!;
        dlink = dlinkM && dlinkM[1];
        let uaM = aria2c.match(/--user-agent="(.*?)"/)!;
        ua = uaM && uaM[1];
      }
    });
    if (dlink && ua) {
      // let dlinkRes: any = {};
      // try {
      //   dlinkRes = $http.get(dlink, {
      //     headers: {
      //       "User-Agent": ua,
      //     },
      //     redirect: false,
      //   });
      // } catch (e) {
      //   if (e.message == "Request failed with status code -1")
      //     return "toast://请求超时，可尝试重新获取";
      //   return "toast://未获取到地址，可尝试重新获取";
      // }
      // return (
      //   (dlinkRes.headers.location[0] &&
      //     `${
      //       dlinkRes.headers.location[0]
      //     }&hiker_type=.mp4;{User-Agent@${ua.replace(
      //       /;/g,
      //       "%%"
      //     )}.js:input.replace(\/%%\/g,"；；")}`) ||
      //   "toast://未获取到地址，可尝试重新获取"
      // );
      return (
        (dlink &&
          `${dlink}&hiker_type=.mp4;{User-Agent@${ua.replace(
            /;/g,
            "%%"
          )}.js:input.replace(\/%%\/g,"；；")}`) ||
        "toast://未获取到地址，可尝试重新获取"
      );
    } else return "toast://未获取到地址，可尝试重新获取";
  }
}

export function image_dl(
  fs_id: string,
  randsk: string,
  share_id: string,
  uk: string,
  filesize: string,
  pass: string
): string {
  let _KinhDownload = new KinhDownload();
  let res: any = {};
  try {
    res = _KinhDownload.dl(fs_id, randsk, share_id, uk, filesize, pass);
  } catch (e) {
    return `toast://${e.message}`;
  }
  if (isObject(res.data))
    if (!!res.data.dlink && !!res.data.ua) {
      let dlinkRes: any = {};
      try {
        dlinkRes = $http.get(res.data.dlink, {
          headers: {
            "User-Agent": res.data.ua,
          },
          redirect: false,
        });
      } catch (e) {
        if (e.message == "Request failed with status code -1")
          return "toast://请求超时，可尝试重新获取";
        return "toast://未获取到地址，可尝试重新获取";
      }
      return (
        (dlinkRes.headers.location[0] &&
          `${dlinkRes.headers.location[0]}@User-Agent=${res.data.ua}@Referer=https://www.baidu.com`) ||
        "toast://未获取到地址，可尝试重新获取"
      );
    } else return "toast://未获取到地址，可尝试重新获取";
  else {
    let pArr = parseDomForArray(res.data, ".alert-primary&&p");
    let dlink: string = "";
    let ua: string = "";
    pArr.forEach((p) => {
      if (p.indexOf("下载参数") !== -1) {
        let aria2c = parseDomForHtml(p, "b&&Text");
        let dlinkM = aria2c.match(/"(.*?)"/)!;
        dlink = dlinkM && dlinkM[1];
        let uaM = aria2c.match(/--user-agent="(.*?)"/)!;
        ua = uaM && uaM[1];
      }
    });
    if (dlink && ua) {
      let dlinkRes: any = {};
      // try {
      //   dlinkRes = $http.get(dlink, {
      //     headers: {
      //       "User-Agent": ua,
      //     },
      //     redirect: false,
      //   });
      // } catch (e) {
      //   if (e.message == "Request failed with status code -1")
      //     return "toast://请求超时，可尝试重新获取";
      //   return "toast://未获取到地址，可尝试重新获取";
      // }
      // return (
      //   (dlinkRes.headers.location[0] &&
      //     `${dlinkRes.headers.location[0]}@User-Agent=${ua}@Referer=https://www.baidu.com`) ||
      //   "toast://未获取到地址，可尝试重新获取"
      // );
      return (
        (dlink && `${dlink}@User-Agent=${ua}@Referer=https://www.baidu.com`) ||
        "toast://未获取到地址，可尝试重新获取"
      );
    } else return "toast://未获取到地址，可尝试重新获取123";
  }
}

export function dl(
  fs_id: string,
  randsk: string,
  share_id: string,
  uk: string,
  filesize: string,
  pass: string
): void {
  let _KinhDownload = new KinhDownload();
  let res: any = {};
  try {
    res = _KinhDownload.dl(fs_id, randsk, share_id, uk, filesize, pass);
  } catch (e) {
    setHomeResult({
      data: [
        {
          title: `<p style="text-align:center"><font color="red">${e.message}</font></p>`,
          col_type: "rich_text",
        },
      ],
    });
  }
  if (isObject(res.data))
    if (!!res.data.dlink && !!res.data.ua) {
      setHomeResult({
        data: [
          {
            title: `<strong>文件名：${res.data.server_filename}</strong>`,
            col_type: "rich_text",
          },
          {
            title: "",
            col_type: "line_blank",
          },
          {
            title: "<strong>下载地址：</strong>",
            col_type: "rich_text",
          },
          {
            title: `${res.data.dlink}`,
            col_type: "text_1",
            desc: "长按复制下载地址（复制不完整请到下载地址2）",
            url: `${res.data.dlink}`,
          },
          {
            title: "",
            col_type: "line_blank",
          },
          {
            title: "<strong>User-Agent：</strong>",
            col_type: "rich_text",
          },
          {
            title: `${res.data.ua}`,
            col_type: "text_1",
            desc: "长按复制 User-Agent",
            url: "toast://长按复制",
          },
          {
            title: "",
            col_type: "line_blank",
          },
          {
            title: "<strong>支持 KinhDownload：</strong>",
            col_type: "rich_text",
          },
          {
            title: `现在云解析必须将文件转存到超级会员账号内才可进行下载每天只能转成5万个文件，希望大家可以对云解析进行提供，限速的账号也行！限速的账号也行！限速的账号也行！你无需购买，只要到哔喱哔喱，微博账号分享帖子，微信公众号账号分享帖子，这个工具即可将svip账号加入到云解析数据库中，集中的越多以后越稳定！<a href="https://ubaq.lanzous.com/iOR96jepmte">https://ubaq.lanzous.com/iOR96jepmte</a>`,
            col_type: "rich_text",
          },
          {
            title: "",
            col_type: "line_blank",
          },
          {
            title: "<strong>下载地址2：</strong>",
            col_type: "rich_text",
          },
          {
            title: `${res.data.dlink}`,
            col_type: "rich_text",
          },
        ] as HomeRuleItem[],
      });
    } else
      setHomeResult({
        data: [
          {
            title: `<p style="text-align:center"><font color="red">未获取到地址，可尝试重新获取</font></p>`,
            col_type: "rich_text",
          },
        ],
      });
  else {
    let pArr = parseDomForArray(res.data, ".alert-primary&&p");
    let dlink: string = "";
    let ua: string = "";
    let aria2c: string = "";
    let server_filename: string = "";
    pArr.forEach((p) => {
      if (p.indexOf("下载参数") !== -1) {
        aria2c = parseDomForHtml(p, "b&&Text");
        let dlinkM = aria2c.match(/"(.*?)"/)!;
        dlink = dlinkM && dlinkM[1];
        let uaM = aria2c.match(/--user-agent="(.*?)"/)!;
        ua = uaM && uaM[1];
        let server_filenameM = aria2c.match(/--out="(.*?)"/)!;
        server_filename = server_filenameM && server_filenameM[1];
      }
    });
    if (aria2c && dlink && ua) {
      setHomeResult({
        data: [
          {
            title: `<strong>文件名：${server_filename}</strong>`,
            col_type: "rich_text",
          },
          {
            title: "",
            col_type: "line_blank",
          },
          {
            title: "<strong>下载地址：</strong>",
            col_type: "rich_text",
          },
          {
            title: `${dlink}`,
            col_type: "text_1",
            desc: "长按复制下载地址（复制不完整请到下载地址2）",
            url: `${dlink}`,
          },
          {
            title: "",
            col_type: "line_blank",
          },
          {
            title: "<strong>User-Agent：</strong>",
            col_type: "rich_text",
          },
          {
            title: `${ua}`,
            col_type: "text_1",
            desc: "长按复制 User-Agent",
            url: "toast://长按复制",
          },
          {
            title: "",
            col_type: "line_blank",
          },
          {
            title: "<strong>支持 KinhDownload：</strong>",
            col_type: "rich_text",
          },
          {
            title: `现在云解析必须将文件转存到超级会员账号内才可进行下载每天只能转成5万个文件，希望大家可以对云解析进行提供，限速的账号也行！限速的账号也行！限速的账号也行！你无需购买，只要到哔喱哔喱，微博账号分享帖子，微信公众号账号分享帖子，这个工具即可将svip账号加入到云解析数据库中，集中的越多以后越稳定！<a href="https://ubaq.lanzous.com/iOR96jepmte">https://ubaq.lanzous.com/iOR96jepmte</a>`,
            col_type: "rich_text",
          },
          {
            title: "",
            col_type: "line_blank",
          },
          {
            title: "<strong>aria2c：</strong>",
            col_type: "rich_text",
          },
          {
            title: `${aria2c}`,
            col_type: "rich_text",
          },
          {
            title: "",
            col_type: "line_blank",
          },
          {
            title: "<strong>下载地址2：</strong>",
            col_type: "rich_text",
          },
          {
            title: `${dlink}`,
            col_type: "rich_text",
          },
        ] as HomeRuleItem[],
      });
    } else
      setHomeResult({
        data: [
          {
            title: `<p style="text-align:center"><font color="red">未获取到地址，可尝试重新获取</font></p>`,
            col_type: "rich_text",
          },
        ],
      });
  }
}
