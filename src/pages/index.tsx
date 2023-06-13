import AuthNotFound from "@/components/auth/AuthNotFound";
import MainLayout from "@/components/layouts/MainLayout";
import SectionHomeNews from "@/components/SectionHomeNews";
import SectionHomeSearch from "@/components/SectionHomeSearch";
import SectionHomeTopics from "@/components/SectionHomeTopics";
import SectionHomeVanBan from "@/components/SectionHomeVanBan";
import Infringe from "@/types/infringe/Infringe";
import Head from "next/head";
import { Fragment } from "react";

type Result = {
  rows: Infringe[];
  count: number;
  total_pages: number;
};

export default function Home() {
  // const router = useRouter();

  // const { getString } = useQueryString();

  // const keywordQueryString = getString("keyword");

  // const [result, setResult] = useState<PaginationResponse<Violation>>(
  //   PAGINATION_RESPONSE_EMPTY
  // );
  // const [news, setNews] = useState<News[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [page, setPage] = useState(1);

  // const { register, handleSubmit, setValue } = useForm();

  // const onSubmit: SubmitHandler<FieldValues> = async (values) => {
  //   const { keyword } = values;
  //   router.push(`?keyword=${keyword}`);
  // };

  // const fetchSearchResult = (
  //   str: string,
  //   p?: number,
  //   limit?: number,
  //   isNext?: boolean
  // ) => {
  //   return violationApi.search(str, p, limit).then((data) => {
  //     setResult({
  //       ...data,
  //       ...(isNext ? { rows: [...result.rows, ...data.rows] } : {}),
  //     });
  //   });
  // };

  // useEffect(() => {
  //   if (keywordQueryString !== "") {
  //     setLoading(true);
  //     fetchSearchResult(keywordQueryString, 1, DEFAULT_LIMIT).finally(() => {
  //       setLoading(false);
  //     });
  //     setValue("keyword", keywordQueryString);
  //   }
  // }, [keywordQueryString]);

  return (
    <Fragment>
      <Head>
        <title>Trang chủ</title>
      </Head>
      <AuthNotFound>
        <MainLayout onlyChildren={true}>
          <SectionHomeSearch />
          <SectionHomeTopics />
          <SectionHomeVanBan />
          <SectionHomeNews />
        </MainLayout>
      </AuthNotFound>
    </Fragment>
  );
}
