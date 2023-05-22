import Dieu from "../dieu/Dieu";

type VanBan = {
  title: string;
  code: string;
  short_code: string;
  type: string;
  html: string;
  href: string;
  dieus?: Dieu[];
  mucs?: Array<{
    title: string;
    code: string;
  }>;
};

export default VanBan;
