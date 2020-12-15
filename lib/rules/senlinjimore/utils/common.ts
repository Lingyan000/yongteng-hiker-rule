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