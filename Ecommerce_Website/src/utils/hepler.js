export const getToken = () => sessionStorage.getItem("auth-token");

export function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
export function formatCurrency(number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(number)
    .replace("₫", "");
}
export const convertISOToDateFormat = (isoDateString) => {
  const date = new Date(isoDateString);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return formattedDate;
};
