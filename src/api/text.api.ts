import API from "@/config/api";
import Text from "@/types/text/Text";
import TextParams from "@/types/text/TextParams";

const api = new API();

type SearchResult = {
  HtmlPage_Seo: string;
  HtmlPage: string;
  Title: string;
  Description: string;
  Option: {
    IsRss: boolean;
    Language: boolean;
    RowPerPage: number;
    CurrentPage: number;
    Keyword: string;
    TotalRow: number;
    CoQuanBanHanhID: string;
    KieuVanBanID: string;
    LinhVucID: string;
    LoaiVanBanID: string;
    NguoiKyID: string;
    TinhTrangHieuLucID: string;
    IsRssFull: boolean;
    IsRssFullContent: boolean;
  };
  LtsMaps: {
    Title: string;
    Url: string;
  }[];
  Items: Text[];
  FacetOption: {
    Type: number;
    Title: string;
    Param: string;
    IsCurrent: boolean;
    Order: number;
    Facets: {
      Key: string;
      UrlFacet: string;
      Title: string;
      Total: number;
    }[];
  }[];
  CoQuanBanHanh: {
    Updated: string;
  };
  KieuVanBan: {
    Updated: string;
  };
  LinhVuc: {
    Updated: string;
  };
  LoaiVanBan: {
    Updated: string;
  };
  NguoiKy: {
    Updated: string;
  };
  TinhTrangHieuLuc: {
    Updated: string;
  };
};

const getKinds = (): Promise<
  { Title: string; UID: string; Updated: string }[]
> => api.get("loaivanban");

const getIssuingOrganizations = (): Promise<
  { Title: string; UID: string; Updated: string }[]
> => api.get("loaivanban");

const getAreas = (): Promise<
  { Title: string; UID: string; Updated: string }[]
> => api.get("linhvuc");

const getSigners = (): Promise<
  { Title: string; UID: string; Updated: string }[]
> => api.get("nguoiky");

const getStatuses = (): Promise<
  { Title: string; UID: string; Updated: string }[]
> => api.get("tinhtranghieuluc");

const search = (params?: TextParams): Promise<SearchResult> =>
  api.get("van-ban/search", params);

const textApi = {
  getKinds,
  getIssuingOrganizations,
  getAreas,
  getSigners,
  getStatuses,
  search,
};

export default textApi;
