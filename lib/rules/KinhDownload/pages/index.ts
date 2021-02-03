import { parse } from "url";
import * as querystring from "querystring";
import { hiker_setHomeResult } from "hiker-nice/lib/utils/hiker";
import { HomeRuleItem } from "../../../utils/common";
import { disclaimer, isAgree } from "./disclaimer";
import wholeList from "./whole";

declare function putVar(key: string, value: any): void;
declare function getVar(key: string, value?: any): any;

export function loadPage(
  url: string,
  pass: string,
  baseUrl: string = "http://pan.kdbaidu.com"
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
  putVar("kinhDownload_baseUrl", baseUrl);
  if (isAgree()) {
    items = wholeList(params.url!, params.pwd, pass);
  } else {
    items = disclaimer();
  }
  hiker_setHomeResult({
    data: items,
  });
}
