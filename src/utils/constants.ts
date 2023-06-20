export const PUBLIC_ROUTES = {
  HOME: "/",
  LAWS: "/luat",
  PUNISHMENTS: "/xu-phat",
  OVERVIEW: "/gioi-thieu",
  CONTACT: "/lien-he",
  VIOLATIONS: "/vi-pham",
  GROUP_VIOLATIONS: "/nhom-vi-pham",
  NGHI_DINH: "/nghi-dinh",
  CHAT: "/tro-chuyen",
  NEWS: "/tin-tuc",
  VANBAN: "/van-ban",
  SEARCH: "/tim-kiem",
  TRAFFIC_SIGNS: "/bien-bao-hieu",
  LOGIN: "/dang-nhap",
  REGISTER: "/dang-ky",
};

export const PROTECTED_ROUTES = {
  DASHBOARD: "/admin",
  GROUP_TRAFFIC_SIGNS: "/admin/nhom-bien-bao-giao-thong",
  TRAFFIC_SIGNS: "/admin/bien-bao-giao-thong",
  PROFILE: "/admin/thong-tin-tai-khoan",
  VIOLATIONS: "/admin/xu-phat-giao-thong",
  LOGIN: "/admin/dang-nhap",
};

export const IS_NEXT_RESPONSE_EMPTY = {
  rows: [],
  isNext: false,
};
export const PAGINATION_RESPONSE_EMPTY = {
  rows: [],
  count: 0,
  total_pages: 0,
};
export const DEFAULT_LIMIT = 10;
export const DEFAULT_PAGE = 1;
export const HOME_PAGE = {
  LIMIT_NEWS: 4,
  LIMIT_VANBAN: 10,
};
export const PLACEHOLDER_THUMBNAIL = "/images/placeholder-thumbnail.jfif";
export const HEADER_HEIGHT = 80;
export const DASHBOARD = {
  SIDEBAR_WIDTH: 286,
  HEADER_HEIGHT: 80,
};
