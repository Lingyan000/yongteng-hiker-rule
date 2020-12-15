import { loadCdn } from "../utils/common";
import { HomeRuleItem } from "../../../utils/common";
import { hiker_setError } from "hiker-nice/lib/utils/hiker";
import { senlinjimoreRequest } from "../utils/request";

export default function (): HomeRuleItem[] {
  let res: any = senlinjimoreRequest("album/get_random_album_list", {});
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
      img: element.cover_url,
      desc: element.content,
      col_type: "pic_1_full",
      url: `hiker://empty?id=${element._id}@rule=js:${loadCdn}setHomeResult({data: senlinjimore.imageLists(MY_URL)});`,
    });
    items.push({
      title: "",
      col_type: "big_blank_block",
    });
  });
  return items;
}
