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
