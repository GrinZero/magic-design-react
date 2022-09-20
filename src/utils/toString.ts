// 解决某些版本, unknown类型没有toString方法
export const toString = (value: unknown) => {
  return (value as object | null)?.toString();
};
