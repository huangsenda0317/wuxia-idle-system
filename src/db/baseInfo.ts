import dayjs from "dayjs";

export const baseInfo = (name: string) => {
  return {
    name: name,
    lv: 0,
    exp: 0,
    created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    updated_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    gold: 0,
    qiaoFu: {
      lv: 0,
      exp: 0,
      items: {
        青皮柳: 0,
        铁杉木: 0,
        醉仙桃: 0,
        八卦竹: 0,
        寒潭柏: 0,
        金丝楠: 0,
        血枫木: 0,
        玉菩提: 0,
        幽冥槐: 0,
        龙血木: 0,
      },
    },
  };
};
