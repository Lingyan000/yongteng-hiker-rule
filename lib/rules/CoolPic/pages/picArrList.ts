import { HomeRuleItem } from "../../../utils/common";
import { hiker_setError } from "hiker-nice/lib/utils/hiker";
import { NetworkHelper } from "../utils/NetworkHelper";

export default function (id: number | string): HomeRuleItem[] {
  let _NetworkHelper = new NetworkHelper();
  let res: any = _NetworkHelper.request(
    `https://api.coolapk.com/v6/feed/detail?id=${id}`
  );
  let data;
  try {
    data = res.data;
  } catch (e) {
    hiker_setError(res);
    return [];
  }
  let items: HomeRuleItem[] = [];
  data.picArr.forEach((element: any) => {
    items.push({
      title: "",
      img: element + ".s.jpg@Referer=http://image.coolapk.com/",
      col_type: "pic_3",
      url: element + "@Referer=http://image.coolapk.com/",
    });
  });
  return items;
}
