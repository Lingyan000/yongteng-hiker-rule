import { HomeRuleItem } from "../../../utils/common";
import { hiker_setError } from "hiker-nice/lib/utils/hiker";
import { senlinjimoreRequest } from "../utils/request";

export default function (page: number, size: number = 30): HomeRuleItem[] {
  let res: any = senlinjimoreRequest("wallpaper/get_wallpaper_list", {
    page,
    size,
  });
  let data;
  try {
    data = res.data.data;
  } catch (e) {
    hiker_setError(res);
    return [];
  }
  let items: HomeRuleItem[] = [];
  data.forEach((element: any) => {
    items.push({
      title: element.name,
      img: element.detailUrl,
      desc: element.tag,
      col_type: "pic_3",
      url: element.originalUrl,
    });
  });
  return items;
}
