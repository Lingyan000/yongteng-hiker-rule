import { $http } from "hiker-nice";
import qs from "qs";

export class KinhDownload {
  private surl: string = "";
  private pwd: string = "";
  private uk: string = "";
  private shareid: string = "";
  post(link: string, pwd: string = "") {
    this.pwd = pwd;
    if (this.validate(link))
      return $http.post(
        "https://pan.kdbaidu.com/",
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
  OpenDir(
    path: string,
    pwd: string,
    share_id: string,
    uk: string,
    surl: string,
    randsk: string
  ) {
    return $http.post(
      "https://pan.kdbaidu.com/",
      qs.stringify({
        dir: path,
        pwd,
        surl,
        share_id,
        uk,
        randsk,
      })
    );
  }
}
