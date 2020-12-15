import { parse } from "url";
import * as querystring from "querystring";
import { hiker_setHomeResult } from "hiker-nice/lib/utils/hiker";
import { HomeRuleItem, pageEnd } from "../../../utils/common";
import album from "./album";
import classify from "./classify";
import classifyList from "./classifyList";
import lastDownList from "./lastDownList";
import hotList from "./hotList";
import selectedList from "./selectedList";
import landscapeList from "./landscapeList";
import padList from "./padList";
import wallpaperList from "./wallpaperList";
import { recommend } from "..";
import { disclaimer, isAgree } from "./disclaimer";

export function loadPage(url: string): void {
  let arg = parse(url).query;
  let params: {
    class?: string;
    page?: string;
    id?: string;
    [propName: string]: any;
  } = querystring.parse(arg);
  let items: HomeRuleItem[] = [];
  if (isAgree()) {
    switch (params.class) {
      // 专辑
      case "album":
        items = album(parseInt(params.page) - 1);
        if (items.length <= 0) {
          items.push(pageEnd);
        }
        break;
      // 分类
      case "classify":
        if (parseInt(params.page) == 1) {
          items = classify();
        } else {
          items.push(pageEnd);
        }
        break;
      // 分类详情
      case "classifyList":
        items = classifyList(params.id, parseInt(params.page) - 1);
        if (items.length <= 0) {
          items.push(pageEnd);
        }
        break;
      // 今日热门
      case "lastDownList":
        items = lastDownList(parseInt(params.page) - 1);
        if (items.length <= 0) {
          items.push(pageEnd);
        }
        break;
      // 最受欢迎
      case "hotList":
        items = hotList(parseInt(params.page) - 1);
        if (items.length <= 0) {
          items.push(pageEnd);
        }
        break;
      // 精选
      case "selectedList":
        items = selectedList(parseInt(params.page) - 1);
        if (items.length <= 0) {
          items.push(pageEnd);
        }
        break;
      // 电脑
      case "landscapeList":
        items = landscapeList(parseInt(params.page) - 1);
        if (items.length <= 0) {
          items.push(pageEnd);
        }
        break;
      // 平板
      case "padList":
        items = padList(parseInt(params.page) - 1);
        if (items.length <= 0) {
          items.push(pageEnd);
        }
        break;
      // 手机
      case "wallpaperList":
        items = wallpaperList(parseInt(params.page) - 1);
        if (items.length <= 0) {
          items.push(pageEnd);
        }
        break;
      // 精彩推荐
      case "recommend":
        if (parseInt(params.page) == 1) {
          items = recommend();
        } else {
          items.push(pageEnd);
        }
        break;
      default:
        break;
    }
  } else {
    items = disclaimer();
  }
  hiker_setHomeResult({
    data: items,
  });
}
