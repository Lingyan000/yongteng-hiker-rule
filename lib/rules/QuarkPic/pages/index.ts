import { parse } from "url";
import * as querystring from "querystring";
import { hiker_setHomeResult } from "hiker-nice/lib/utils/hiker";
import { HomeRuleItem } from "../../../utils/common";
import { disclaimer, isAgree } from "./disclaimer";
import imageList from "./imageList";

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
    items = imageList(params.class);
  } else {
    items = disclaimer();
  }
  hiker_setHomeResult({
    data: items,
  });
}
