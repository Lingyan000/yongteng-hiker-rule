import { parse } from "url";
import * as querystring from "querystring";
import { hiker_setHomeResult } from "hiker-nice/lib/utils/hiker";
import { HomeRuleItem } from "../../../utils/common";
import { disclaimer, isAgree } from "./disclaimer";
import wholeList from "./whole";

export function loadPage(
  url: string,
  pass: string,
  baseUrl: string = "http://111.229.144.179/KinhDown[DP]Web/"
): void {
  let arg = parse(url).query;
  let params: {
    class?: string;
    page?: string;
    id?: string;
    url?: string;
    pwd?: string;
    [propName: string]: any;
  } = querystring.parse(arg!);
  let items: HomeRuleItem[] = [];
  if (isAgree()) {
    items = wholeList(params.url!, params.pwd, pass, baseUrl);
  } else {
    items = disclaimer();
  }
  hiker_setHomeResult({
    data: items,
  });
}
