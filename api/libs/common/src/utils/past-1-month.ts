export function calcPast1MonthDate() {
  const now = new Date();
  const past1Month = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate(),
  );
  return past1Month;
}
