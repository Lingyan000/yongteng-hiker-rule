import { HomeRuleItem } from "../../../utils/common";
import { hiker_setError } from "hiker-nice/lib/utils/hiker";
import { parse } from "url";
import * as querystring from "querystring";
import { senlinjimoreRequest } from "../utils/request";

export default function (url: string): HomeRuleItem[] {
  let arg = parse(url).query;
  let params: { id?: string; [propName: string]: any } = querystring.parse(arg);
  let albumId: string = params.id;
  let res: any = senlinjimoreRequest("album/get_album_image_list", {
    albumId,
  });
  let data;
  try {
    data = res.data.data.imageList;
  } catch (e) {
    hiker_setError(res);
    return [];
  }
  let items: HomeRuleItem[] = [];
  items.push({
    title: res.data.data.name,
    img: res.data.data.banner_list[0].url,
    col_type: "pic_1_card",
    desc: res.data.data.introduce + "\n赞:" + res.data.data.like_num,
    url: res.data.data.banner_list[0].url,
  });
  data.forEach((element: any) => {
    items.push({
      title: element.name,
      img: element.detailUrl,
      desc: element.tag,
      col_type: "pic_1_full",
      url: element.originalUrl,
    });
  });
  return items;
}
