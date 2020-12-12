import { version } from "../../../../package.json";

export function getTimestamp(): number {
  return Date.parse(new Date().toString());
}

export const loadCdn = `eval(fetch(getVar("cdn_senlinjimore","https://cdn.jsdelivr.net/npm/yongteng-hiker-rule@${version}/dist/senlinjimore/index.min.js")));`;

export interface headers {
  "x-serverless-sign": string;
  referer?: string;
  "user-agent"?: string;
  "content-type"?: string;
  [propName: string]: any;
}

export interface RuleItem {
  title: string;
  img?: string;
  pic?: string;
  url?: string;
  desc?: string;
}

export interface HomeRuleItem extends RuleItem {
  col_type?: string;
}

export interface SearchRuleItem extends RuleItem {
  content?: string;
}

export const pageEnd: HomeRuleItem = {
  title: '““””<small><font color="gray">----- 已展示全部 -----</font></small>',
  col_type: "text_center_1",
};
