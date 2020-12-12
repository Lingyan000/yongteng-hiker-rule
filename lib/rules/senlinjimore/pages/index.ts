import { parse } from "url";
import * as querystring from "querystring";
import { hiker_setHomeResult } from "hiker-nice/lib/utils/hiker";
import { HomeRuleItem, pageEnd } from "../utils/common";
import album from "./album";
import classify from "./classify";
import classifyList from "./classifyList";
import lastDownList from "./lastDownList";
import hotList from "./hotList";
import selectedList from "./selectedList";
import landscapeList from "./landscapeList";
import padList from "./padList";
import wallpaperList from "./wallpaperList";

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
    case "lastDownList":
      items = lastDownList(parseInt(params.page) - 1);
      if (items.length <= 0) {
        items.push(pageEnd);
      }
      break;
    case "hotList":
      items = hotList(parseInt(params.page) - 1);
      if (items.length <= 0) {
        items.push(pageEnd);
      }
      break;
    case "selectedList":
      items = selectedList(parseInt(params.page) - 1);
      if (items.length <= 0) {
        items.push(pageEnd);
      }
      break;
    case "landscapeList":
      items = landscapeList(parseInt(params.page) - 1);
      if (items.length <= 0) {
        items.push(pageEnd);
      }
      break;
    case "padList":
      items = padList(parseInt(params.page) - 1);
      if (items.length <= 0) {
        items.push(pageEnd);
      }
      break;
    case "wallpaperList":
      items = wallpaperList(parseInt(params.page) - 1);
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
