// 格式化数字
export const formatNumber = (number: number) => {
  return new Intl.NumberFormat().format(number);
};
