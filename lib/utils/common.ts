declare const MY_RULE: {
  area_name: string;
  area_url: string;
  associatedModelsMapForJoinTable: any;
  associatedModelsMapWithFK: any;
  associatedModelsMapWithoutFK: any;
  author: string;
  class_name: string;
  class_url: string;
  col_type: string;
  detail_col_type: string;
  detail_find_rule: string;
  fieldsToSetToDefault: any[];
  find_rule: string;
  firstHeader: string;
  group: string;
  id: number;
  listToClearAssociatedFK: any[];
  listToClearSelfFK: any[];
  order: number;
  preRule: string;
  saved: boolean;
  sdetail_col_type: string;
  sdetail_find_rule: string;
  searchFind: string;
  search_url: string;
  sort_name: string;
  sort_url: string;
  title: string;
  titleColor: string;
  ua: string;
  url: string;
  version: 0;
  year_name: string;
  year_url: string;
};

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

export function getQuery(type: string): string {
  switch (type) {
    case "class":
      return MY_RULE.class_url;
    case "area":
      return MY_RULE.area_url;
    case "sort":
      return MY_RULE.sort_url;
    case "year":
      return MY_RULE.year_url;
    default:
      return getQuery(MY_RULE.firstHeader);
  }
}
