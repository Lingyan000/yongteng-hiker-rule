import { hiker_fetch } from "hiker-nice/lib/utils/hiker";
import { HomeRuleItem } from "../utils/common";

const statement = `
<h2 style="text-align:center">免责声明：</h2>
<font color="red">本规则仅供学习交流，请于24小时内删除。</font><br/>
规则接口来源于「森图」微信小程序。<br/>
若是你喜欢「森图」，请前往微信小程序获得更好的使用体验。<br/>
<br/>
如果侵犯了你的权益，请通知我，我会及时删除侵权内容。<br/>
联系邮箱：peng120710372@gmail.com
`;

export function disclaimer(): HomeRuleItem[] {
  let items: HomeRuleItem[] = [];
  items.push({
    title: statement,
    col_type: "rich_text",
  });
  items.push({
    title: "不同意",
    col_type: "text_2",
    url: "toast://你选择了不同意",
  });
  items.push({
    title: "同意",
    col_type: "text_2",
    url:
      "hiker://empty@lazyRule=.js:writeFile('hiker://files/senlinjimore/.disclaimer','1');refreshPage();'toast://已同意'",
  });
  return items;
}

export function isAgree(): boolean {
  let res = hiker_fetch("hiker://files/senlinjimore/.disclaimer", {});
  return res == "1";
}
