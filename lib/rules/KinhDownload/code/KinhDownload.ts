import { $http } from "hiker-nice";
import qs from "qs";
import { HomeRuleItem } from "../../../utils/common";
import { loadCdn } from "../utils/common";
declare function parseDomForHtml(html: string, choose: string): string;
declare function parseDomForArray(html: string, choose: string): string[];
declare function putVar(key: string, value: any): void;
declare function getVar(key: string, value?: any): any;

export class KinhDownload {
  private surl: string = "";
  private pwd: string = "";
  private uk: string = "";
  private shareid: string = "";
  private pass: string = "";
  private baseUrl: string = "http://pan.kdbaidu.com";
  constructor() {
    this.baseUrl = getVar("kinhDownload_baseUrl", "http://pan.kdbaidu.com");
  }

  getPass() {
    let res = $http.get(this.baseUrl);
    let html = res.data;
    let pass = parseDomForHtml(html, "input[name=pass]&&value");
    return pass;
  }

  post(link: string, pwd: string = "", pass: string = "") {
    this.pwd = pwd;
    if (pass === "") this.pass = this.getPass();
    else this.pass = pass;
    if (this.validate(link))
      return $http.post(
        this.baseUrl,
        qs.stringify({
          surl: this.surl,
          pwd: this.pwd,
          uk: this.uk,
          shareid: this.shareid,
          pass: this.pass,
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
    randsk: string,
    pass: string
  ) {
    return $http.post(
      this.baseUrl,
      qs.stringify(
        {
          dir: path,
          pwd,
          surl,
          share_id,
          uk,
          randsk: decodeURI(randsk),
          pass,
        },
        { encode: false }
      )
    );
  }
  dl(
    fs_id: string,
    randsk: string,
    share_id: string,
    uk: string,
    filesize: string,
    pass: string
  ) {
    try {
      return $http.post(
        `${this.baseUrl}?download_aria2`,
        qs.stringify(
          {
            fs_id,
            randsk: decodeURI(randsk),
            share_id,
            uk,
            filesize,
            pass,
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
    const mode = getVar("KD_Multilayer", "Part");
    return [
      {
        title: `${(mode === "All" && "☑ ") || "☐ "}全部二级`,
        url: `hiker://empty@lazyRule=.js:putVar("KD_Multilayer","All");refreshPage();"toast://全部二级模式"`,
        col_type: "text_2",
      },
      {
        title: `${(mode === "Part" && "☑ ") || "☐ "}部分二级`,
        url: `hiker://empty@lazyRule=.js:putVar("KD_Multilayer","Part");refreshPage();"toast://部分二级模式"`,
        col_type: "text_2",
      },
      ...list.map((li) => {
        let name = parseDomForHtml(li, "a&&Text");
        let size = "";
        try {
          size = parseDomForHtml(li, ".btn,0&&Text");
        } catch (error) {
          size = "";
        }
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
            url:
              mode === "Part"
                ? `hiker://empty@lazyRule=.js:${loadCdn}${parseDomForHtml(
                    li,
                    ".btn,1&&href"
                  ).replace("javascript:", "KinhDownload.video_")};`
                : `hiker://empty@rule=js:${loadCdn}${parseDomForHtml(
                    li,
                    ".btn,1&&href"
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
            url:
              mode === "Part"
                ? `hiker://empty@lazyRule=.js:${loadCdn}${parseDomForHtml(
                    li,
                    ".btn,1&&href"
                  ).replace("javascript:", "KinhDownload.image_")};`
                : `hiker://empty@rule=js:${loadCdn}${parseDomForHtml(
                    li,
                    ".btn,1&&href"
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
              ".btn,1&&href"
            ).replace("javascript:", "KinhDownload.")};`,
          };
        }
      }),
    ];
  }
}
