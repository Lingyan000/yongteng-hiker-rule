import { HomeRuleItem, loadCdn } from "../utils/common";
import { hiker_setError } from "hiker-nice/lib/utils/hiker";
import { senlinjimoreRequest } from "../utils/request";

export default function (): HomeRuleItem[] {
  let res: any = senlinjimoreRequest("wallpaper/get_classify_list", {});
  let data;
  try {
    data = res.data.data;
  } catch (e) {
    hiker_setError(res);
    return [];
  }
  let items: HomeRuleItem[] = [];
  data.forEach((element: any) => {
    let col_type: string = "pic_2";
    if (element.isColor) {
      col_type = "icon_round_small_4";
    }
    items.push({
      title: element.name,
      img: element.image,
      col_type,
      url: `hiker://empty?class=classifyList&id=${element._id}&page=fypage@rule=js:${loadCdn}senlinjimore.loadPage(MY_URL);`,
    });
  });
  return items;
}
