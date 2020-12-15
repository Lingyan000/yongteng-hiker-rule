import { loadCdn } from "../utils/common";
import { hiker_setError } from "hiker-nice/lib/utils/hiker";
import { senlinjimoreRequest } from "../utils/request";
import { HomeRuleItem } from "../../../utils/common";

export default function (): HomeRuleItem[] {
  let res: any = senlinjimoreRequest("wallpaper/get_classify_list", {});
  let data;
  try {
    data = res.data.data;
  } catch (e) {
    hiker_setError(res);
    return [];
  }
  let colorData = data.filter((d: { isColor?: boolean }) => {
    return d.isColor;
  });
  let wallpaperData = data.filter((d: { isColor?: boolean }) => {
    return !d.isColor;
  });
  let items: HomeRuleItem[] = [];
  items.push({
    title: "<strong>比例分类</strong>",
    col_type: "rich_text",
  });
  items = [
    ...items,
    {
      title: "电脑",
      img: "https://wallpaper.senlinjimore.com/images/pc.jpg",
      col_type: "movie_3",
      url: `hiker://empty?class=landscapeList&page=fypage@rule=js:${loadCdn}senlinjimore.loadPage(MY_URL);`,
    },
    {
      title: "平板",
      img: "https://wallpaper.senlinjimore.com/images/pad.jpg",
      col_type: "movie_3",
      url: `hiker://empty?class=padList&page=fypage@rule=js:${loadCdn}senlinjimore.loadPage(MY_URL);`,
    },
    {
      title: "手机",
      img: "https://wallpaper.senlinjimore.com/images/phone.jpg",
      col_type: "movie_3",
      url: `hiker://empty?class=wallpaperList&page=fypage@rule=js:${loadCdn}senlinjimore.loadPage(MY_URL);`,
    },
  ];
  items.push({
    title: "<strong>颜色分类</strong>",
    col_type: "rich_text",
  });
  colorData.forEach((element: any) => {
    if (element.name === "白色")
      element.image =
        "https://cdn.jsdelivr.net/gh/Lingyan000/photos/img/20201212112909.png";
    items.push({
      title: element.name,
      img: element.image,
      col_type: "icon_round_small_4",
      url: `hiker://empty?class=classifyList&id=${element._id}&page=fypage@rule=js:${loadCdn}senlinjimore.loadPage(MY_URL);`,
    });
  });
  items.push({
    title: "<strong>壁纸分类</strong>",
    col_type: "rich_text",
  });
  wallpaperData.forEach((element: any) => {
    items.push({
      title: element.name,
      img: element.image,
      col_type: "pic_2",
      url: `hiker://empty?class=classifyList&id=${element._id}&page=fypage@rule=js:${loadCdn}senlinjimore.loadPage(MY_URL);`,
    });
  });
  return items;
}
