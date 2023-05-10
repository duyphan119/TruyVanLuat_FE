export const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const generateHrefId = (detail: string) => {
  const split = detail.split(" ");
  if (split[0] === "Điểm") {
    return `diem_${split[5]}_${split[3]}_${split[1]}`;
  }
  if (split[0] === "Khoản") {
    return `khoan_${split[3]}_${split[1]}`;
  }
  if (split[0] === "Điều") {
    return `dieu_${split[1]}`;
  }

  return "";
};

export const generateHref = (detail: string) => {
  let result = "/xu-phat";
  const split = detail.split(" NĐ ");

  if (split[1]) {
    result += `/${split[1]}`;
  }

  const id = generateHrefId(detail);
  if (id) {
    result += `#${id}`;
  }

  return result;
};