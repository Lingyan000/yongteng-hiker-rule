export function getTimestamp(): number {
  return Date.parse(new Date().toString());
}

export interface headers {
  "x-serverless-sign": string;
  referer?: string;
  "user-agent"?: string;
  "content-type"?: string;
  [propName: string]: any;
}

export interface RuleItems {
  title: string;
  img?: string;
  pic?: string;
  url?: string;
  desc?: string;
}

export interface HomeRuleItems extends RuleItems {
  col_type?: string;
}

export interface SearchRuleItems extends RuleItems {
  content?: string;
}
