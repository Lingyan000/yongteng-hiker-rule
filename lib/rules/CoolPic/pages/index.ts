import { parse } from "url";
import * as querystring from "querystring";
import { hiker_setHomeResult } from "hiker-nice/lib/utils/hiker";
import { HomeRuleItem, pageEnd } from "../../../utils/common";
import dynamicList from "./dynamicList";
import picArrList from "./picArrList";
import { disclaimer, isAgree } from "./disclaimer";

export function loadPage(url: string): void {
  let arg = parse(url).query;
  let params: {
    class?: string;
    page?: string;
    id?: string;
    [propName: string]: any;
  } = querystring.parse(arg!);
  let items: HomeRuleItem[] = [];
  items = dynamicList(params.class!, parseInt(params.page!));
  if (items.length <= 0) {
    items.push(pageEnd);
  }
  if (isAgree())
    switch (params.class) {
      case "picArr":
        items = picArrList(params.id!);
        break;
      default:
        items = dynamicList(params.class!, parseInt(params.page!));
        if (items.length <= 0) {
          items.push(pageEnd);
        }
        break;
    }
  else items = disclaimer();
  hiker_setHomeResult({
    data: items,
  });
}
