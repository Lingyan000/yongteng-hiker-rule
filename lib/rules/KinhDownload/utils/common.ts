import { version } from "../../../../package.json";

export const loadCdn = `eval(fetch(getVar("cdn_KinhDownload","https://cdn.jsdelivr.net/npm/yongteng-hiker-rule@${version}/dist/KinhDownload/index.min.js")));`;
