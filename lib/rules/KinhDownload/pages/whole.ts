import { HomeRuleItem } from "../../../utils/common";
import { KinhDownload } from "../code/KinhDownload";

export default function wholeList(
  url: string,
  pwd: string = "",
  pass: string
): HomeRuleItem[] {
  let _KinhDownload = new KinhDownload();
  let res: any = _KinhDownload.post(url, pwd, pass);
  return _KinhDownload.parsingList(res.data);
}
