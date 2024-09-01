import dayjs from "dayjs";

export { default as lazyLoad } from "./lazyLoad.tsx";

export const formatScheduledDate = (scheduledDate: Date) => {
  if (!scheduledDate) return "";
  const now = dayjs();
  const date = dayjs(scheduledDate);

  if (date.isSame(now, "day")) {
    return "今天";
  }

  if (date.isSame(now.add(1, "day"), "day")) {
    return "明天";
  }

  if (date.isSame(now, "week") && date.isAfter(now)) {
    const dayOfWeek = date.day(); // 获取星期几，0 是周日，6 是周六
    const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weekDays[dayOfWeek];
  }

  if (date.isSame(now, "year")) {
    return date.format("M月D日");
  }

  return date.format("YYYY年M月D日");
};

export const calcScheduledColor = (scheduledDate: Date) => {
  if (!scheduledDate) return "";
  const now = dayjs();
  const date = dayjs(scheduledDate);

  if (date.isSame(now, "day")) {
    return "#058527";
  }

  if (date.isSame(now.add(1, "day"), "day")) {
    return "#ad6200";
  }

  if (date.isSame(now, "week") && date.isAfter(now)) {
    return "#692ec2";
  }

  if (date.isSame(now, "year")) {
    return "#d1453b";
  }

  return "#808080";
};
