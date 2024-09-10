export const INBOX: InboxType = { __type: "inbox", name: "__inbox__" };

export const TODAY_FILTER: TodayFilterType = { __type: "today", name: "__today__" };

export const RECENT_FILTER: RecentFilterType = { __type: "recent", name: "__recent__" };

export const TASK_GROUP_NAME_MAP: Map<string, string> = new Map([
  [INBOX.name, "收件箱"],
  [TODAY_FILTER.name, "今天"],
  [RECENT_FILTER.name, "即将到来"],
]);
