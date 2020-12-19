import { HomeRuleItem } from "../../../utils/common";
import { KinhDownload } from "../code/KinhDownload";
import { loadCdn } from "../utils/common";
declare function parseDomForHtml(html: string, choose: string): string;
declare function parseDomForArray(html: string, choose: string): string[];

export default function filesList(
  url: string,
  pwd: string = ""
): HomeRuleItem[] {
  let _KinhDownload = new KinhDownload();
  let res: any = _KinhDownload.post(url, pwd);
  let list: string[] = parseDomForArray(res.data, ".list-group&&li");
  return list.map((li) => {
    if (parseDomForArray(li, ".fa-folder").length > 0)
      return {
        title: parseDomForHtml(li, "a&&Text"),
        col_type: "avatar",
        img:
          "https://cdn.jsdelivr.net/gh/Lingyan000/photos/img/20201219163911.png",
        url: `hiker://empty@rule=js:${loadCdn}${parseDomForHtml(
          li,
          "a&&href"
        ).replace("javascript:", "KinhDownload.")};`,
      };
    else
      return {
        title: parseDomForHtml(li, "a&&Text"),
        col_type: "avatar",
        img:
          "https://cdn.jsdelivr.net/gh/Lingyan000/photos/img/20201219163905.png",
        url: `hiker://empty@rule=js:${loadCdn}${parseDomForHtml(
          li,
          "a&&href"
        ).replace("javascript:", "KinhDownload.")};`,
      };
  });
}
