import { $http } from "hiker-nice";
import qs from "qs";
import { HomeRuleItem } from "../../../utils/common";
import { loadCdn } from "../utils/common";
declare function parseDomForHtml(html: string, choose: string): string;
declare function parseDomForArray(html: string, choose: string): string[];

export class KinhDownload {
  private surl: string = "";
  private pwd: string = "";
  private uk: string = "";
  private shareid: string = "";
  post(link: string, pwd: string = "") {
    this.pwd = pwd;
    if (this.validate(link))
      return $http.post(
        "http://111.229.144.179/KD[DP]Web/",
        qs.stringify({
          surl: this.surl,
          pwd: this.pwd,
          uk: this.uk,
          shareid: this.shareid,
        })
      );
    else throw new Error("分享链接填写有误，请检查");
  }
  validate(link: string): boolean {
    let uk: RegExpMatchArray = link.match(/uk=(\d+)/)!,
      shareid: RegExpMatchArray = link.match(/shareid=(\d+)/)!;
    if (uk != null && shareid != null) {
      this.uk = uk[1];
      this.shareid = shareid[1];
      return true;
    }
    let surl: RegExpMatchArray = link.match(/surl=([A-Za-z0-9-_]+)/)!;
    if (surl == null) {
      surl = link.match(/1[A-Za-z0-9-_]+/)!;
      if (surl == null) {
        return false;
      } else this.surl = surl[0];
    } else this.surl = "1" + surl[1];
    return true;
  }
  openDir(
    path: string,
    pwd: string,
    share_id: string,
    uk: string,
    surl: string,
    randsk: string
  ) {
    return $http.post(
      "http://111.229.144.179/KD[DP]Web/",
      qs.stringify(
        {
          dir: path,
          pwd,
          surl,
          share_id,
          uk,
          randsk: decodeURI(randsk),
        },
        { encode: false }
      )
    );
  }
  dl(
    fs_id: string,
    timestamp: string,
    sign: string,
    randsk: string,
    share_id: string,
    uk: string,
    share: string,
    pwd: string
  ) {
    try {
      return $http.post(
        "http://111.229.144.179/KD[DP]Web/?download",
        qs.stringify(
          {
            fs_id,
            timestamp,
            sign,
            randsk: decodeURI(randsk),
            share_id,
            uk,
            share,
            pwd,
          },
          {
            encode: false,
          }
        ),
        { redirect: true, timeout: 30000 }
      );
      // if (res.status === 200) {
      //   return res;
      // } else {
      //   return $http.get(res.headers.location[0],{
      //     timeout: 20000
      //   });
      // }
    } catch (e) {
      if (e.message == "Request failed with status code -1")
        throw new Error("请求超时，可尝试重新获取");
    }
  }
  parsingList(data: string): HomeRuleItem[] {
    let list: string[] = parseDomForArray(data, ".list-group&&li");
    return list.map((li) => {
      let name = parseDomForHtml(li, "a&&Text");
      let size = parseDomForHtml(li, ".float-right&&Text");
      let title = `${name}${size && " --" + size}`;
      if (parseDomForArray(li, ".fa-folder").length > 0)
        return {
          title,
          col_type: "avatar",
          img:
            "https://cdn.jsdelivr.net/gh/Lingyan000/pic@master/img/20201220105956.png",
          url: `hiker://empty@rule=js:${loadCdn}${parseDomForHtml(
            li,
            "a&&href"
          ).replace("javascript:", "KinhDownload.")};`,
        };
      else if (
        [
          "wmv",
          "rmvb",
          "mpeg4",
          "mpeg2",
          "flv",
          "avi",
          "3gp",
          "mpga",
          "qt",
          "rm",
          "wmz",
          "wmd",
          "wvx",
          "wmx",
          "wm",
          "mpg",
          "mp4",
          "mkv",
          "mpeg",
          "mov",
          "asf",
          "m4v",
          "m3u8",
          "swf",
        ].indexOf(name.substr(name.lastIndexOf(".") + 1)) !== -1
      )
        return {
          title,
          col_type: "avatar",
          img:
            "https://cdn.jsdelivr.net/gh/Lingyan000/pic@master/img/20201220203232.png",
          url: `hiker://emptyy@lazyRule=.js:${loadCdn}${parseDomForHtml(
            li,
            "a&&href"
          ).replace("javascript:", "KinhDownload.")};`,
        };
      else if (
        [
          "jpg",
          "jpeg",
          "gif",
          "bmp",
          "png",
          "jpe",
          "cur",
          "svg",
          "svgz",
          "ico",
          "webp",
          "tif",
          "tiff",
        ].indexOf(name.substr(name.lastIndexOf(".") + 1)) !== -1
      )
        return {
          title,
          col_type: "avatar",
          img:
            "https://cdn.jsdelivr.net/gh/Lingyan000/pic@master/img/20201220203238.png",
          url: `hiker://emptyy@lazyRule=.js:${loadCdn}${parseDomForHtml(
            li,
            "a&&href"
          ).replace("javascript:", "KinhDownload.")};`,
        };
      else {
        return {
          title,
          col_type: "avatar",
          img:
            "https://cdn.jsdelivr.net/gh/Lingyan000/pic@master/img/20201220203228.png",
          url: `hiker://empty@rule=js:${loadCdn}${parseDomForHtml(
            li,
            "a&&href"
          ).replace("javascript:", "KinhDownload.")};`,
        };
      }
    });
  }
}
