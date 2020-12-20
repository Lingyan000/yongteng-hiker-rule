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
  randsk: string
): void {
  let _KinhDownload = new KinhDownload();
  let res = _KinhDownload.openDir(path, pwd, share_id, uk, surl, randsk);
  setHomeResult({ data: _KinhDownload.parsingList(res.data) });
}

export function video_dl(
  fs_id: string,
  timestamp: string,
  sign: string,
  randsk: string,
  share_id: string,
  uk: string,
  share: string,
  pwd: string
): string {
  let _KinhDownload = new KinhDownload();
  let res: any = {};
  try {
    res = _KinhDownload.dl(
      fs_id,
      timestamp,
      sign,
      randsk,
      share_id,
      uk,
      share,
      pwd
    );
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
          `${dlinkRes.headers.location[0]};{User-Agent@${res.data.ua.replace(
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
      if (p.indexOf("下载地址") !== -1) {
        dlink = parseDomForHtml(p, "b&&Text");
      }
      if (p.indexOf("User-Agent") !== -1) {
        ua = parseDomForHtml(p, "b&&Text");
      }
    });
    if (dlink && ua) {
      let dlinkRes: any = {};
      try {
        dlinkRes = $http.get(dlink, {
          headers: {
            "User-Agent": ua,
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
          `${dlinkRes.headers.location[0]};{User-Agent@${ua.replace(
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
  timestamp: string,
  sign: string,
  randsk: string,
  share_id: string,
  uk: string,
  share: string,
  pwd: string
): string {
  let _KinhDownload = new KinhDownload();
  let res: any = {};
  try {
    res = _KinhDownload.dl(
      fs_id,
      timestamp,
      sign,
      randsk,
      share_id,
      uk,
      share,
      pwd
    );
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
      if (p.indexOf("下载地址") !== -1) {
        dlink = parseDomForHtml(p, "b&&Text");
      }
      if (p.indexOf("User-Agent") !== -1) {
        ua = parseDomForHtml(p, "b&&Text");
      }
    });
    if (dlink && ua) {
      let dlinkRes: any = {};
      try {
        dlinkRes = $http.get(dlink, {
          headers: {
            "User-Agent": ua,
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
          `${dlinkRes.headers.location[0]}@User-Agent=${ua}@Referer=https://www.baidu.com`) ||
        "toast://未获取到地址，可尝试重新获取"
      );
    } else return "toast://未获取到地址，可尝试重新获取123";
  }
}

export function dl(
  fs_id: string,
  timestamp: string,
  sign: string,
  randsk: string,
  share_id: string,
  uk: string,
  share: string,
  pwd: string
): void {
  let _KinhDownload = new KinhDownload();
  let res: any = {};
  try {
    res = _KinhDownload.dl(
      fs_id,
      timestamp,
      sign,
      randsk,
      share_id,
      uk,
      share,
      pwd
    );
  } catch (e) {
    setError(e.message);
  }
  if (isObject(res.data))
    if (!!res.data.dlink && !!res.data.ua) {
      setHomeResult({
        data: [
          {
            title: "下载地址：",
            col_type: "rich_text",
          },
          {
            title: `${res.data.dlink}`,
            col_type: "rich_text",
          },
          {
            title: "User-Agent：",
            col_type: "rich_text",
          },
          {
            title: `${res.data.ua}`,
            col_type: "rich_text",
          },
        ] as HomeRuleItem[],
      });
    } else setError("未获取到地址，可尝试重新获取");
  else {
    let pArr = parseDomForArray(res.data, ".alert-primary&&p");
    let dlink: string = "";
    let ua: string = "";
    pArr.forEach((p) => {
      if (p.indexOf("下载地址") !== -1) {
        dlink = parseDomForHtml(p, "b&&Text");
      }
      if (p.indexOf("User-Agent") !== -1) {
        ua = parseDomForHtml(p, "b&&Text");
      }
    });
    if (dlink && ua) {
      setHomeResult({
        data: [
          {
            title: "下载地址：",
            col_type: "rich_text",
          },
          {
            title: `${dlink}`,
            col_type: "rich_text",
          },
          {
            title: "User-Agent：",
            col_type: "rich_text",
          },
          {
            title: `${ua}`,
            col_type: "rich_text",
          },
        ] as HomeRuleItem[],
      });
    } else setError("未获取到地址，可尝试重新获取");
  }
}
