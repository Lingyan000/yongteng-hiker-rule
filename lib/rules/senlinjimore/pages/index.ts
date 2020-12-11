import { parse } from "url";
import * as querystring from "querystring";
import { hiker_setHomeResult } from "hiker-nice/lib/utils/hiker";
import { HomeRuleItem, pageEnd } from "../utils/common";
import album from "./album";
import classify from "./classify";
import classifyList from "./classifyList";

export function loadPage(url: string): void {
  let arg = parse(url).query;
  let params: {
    class?: string;
    page?: string;
    id?: string;
    [propName: string]: any;
  } = querystring.parse(arg);
  let items: HomeRuleItem[] = [];
  switch (params.class) {
    case "album":
      items = album(parseInt(params.page) - 1);
      if (items.length <= 0) {
        items.push(pageEnd);
      }
      break;
    case "classify":
      if (parseInt(params.page) == 1) {
        items = classify();
      } else {
        items.push(pageEnd);
      }
      break;
    case "classifyList":
      items = classifyList(params.id, parseInt(params.page) - 1);
      if (items.length <= 0) {
        items.push(pageEnd);
      }
      break;
    default:
      break;
  }
  hiker_setHomeResult({
    data: items,
  });
}
