import { version } from "../../../../package.json";

export const loadCdn = `eval(fetch(getVar("cdn_CoolPic","https://cdn.jsdelivr.net/npm/yongteng-hiker-rule@${version}/dist/CoolPic/index.min.js")));`;
