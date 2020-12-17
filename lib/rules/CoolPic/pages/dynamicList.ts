import { HomeRuleItem } from "../../../utils/common";
import { hiker_setError } from "hiker-nice/lib/utils/hiker";
import { NetworkHelper } from "../utils/NetworkHelper";
import { loadCdn } from "../utils/common";

export default function (listType: string, page: number): HomeRuleItem[] {
  let _NetworkHelper = new NetworkHelper();
  let res: any = _NetworkHelper.request(
    `https://api.coolapk.com/v6/page/dataList?url=%23/feed/coolPictureList?listType=${listType}&buildCard=1&page=${page}`
  );
  let data;
  try {
    data = res.data;
  } catch (e) {
    hiker_setError(res);
    return [];
  }
  let items: HomeRuleItem[] = [];
  function pushItem(d: any) {
    d.forEach((element: any) => {
      if (element.entityTemplate === "feed")
        items.push({
          title: element.title,
          img: element.pic + ".s.jpg@Referer=http://image.coolapk.com/",
          desc: element.tags,
          col_type: "pic_1_card",
          url:
            (element.picArr.length > 1 &&
              `hiker://empty?class=picArr&id=${element.id}@rule=js:${loadCdn}CoolPic.loadPage(MY_URL);`) ||
            element.pic + "@Referer=http://image.coolapk.com/",
        });
      else if (element.entityTemplate === "feedCoolPictureGridCard")
        pushItem(element.entities);
    });
  }
  pushItem(data);
  return items;
}
