import { HomeRuleItem } from "../../../utils/common";
import { KinhDownload } from "../code/KinhDownload";

export function OpenDir(
  path: string,
  pwd: string,
  share_id: string,
  uk: string,
  surl: string,
  randsk: string
): HomeRuleItem[] {
  let _KinhDownload = new KinhDownload();
  let res = _KinhDownload.OpenDir(
    decodeURIComponent(path),
    pwd,
    share_id,
    uk,
    surl,
    decodeURIComponent(randsk)
  );
  setError(res);
  return [];
}
