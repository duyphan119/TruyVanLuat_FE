type Text = {
  SoHieu: string;
  TrichYeu: string;
  NgayBanHanh: string;
  IsEn: boolean;
  ToanVan: string;
  CoQuanBanHanh: {
    Title: string;
    UID: string;
  }[];
  NguoiKy: {
    Title: string;
    UID: string;
  }[];
  LinhVuc: {
    Title: string;
    UID: string;
  }[];
  Poster: string;
  LoaiVanBan: {
    Title: string;
    UID: string;
  };
  KieuVanBan: {
    Title: string;
    UID: string;
  };
  TrinhTrangHieuLuc: {
    Title: string;
    UID: string;
  };
  LuocDo: {
    Title?: string;
    UID?: string;
  };
  Title: string;
  UID: string;
  Updated: string;
};

export default Text;
