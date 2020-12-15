import { HomeRuleItem } from "../../../utils/common";
import { data } from "../assets/qk_official_wallpaper.json";

export default function (_class: string): HomeRuleItem[] {
  let dataList = data.filter((d) => d.tag.indexOf(_class) !== -1);
  return dataList.map((d) => ({
    title: d.new_expired + d.tag,
    img: d.thumbnail,
    url: d.image,
  }));
}
