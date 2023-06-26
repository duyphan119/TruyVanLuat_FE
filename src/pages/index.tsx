import AuthNotFound from "@/components/auth/AuthNotFound";
import MainLayout from "@/components/layouts/MainLayout";
import SectionHomeNews from "@/components/SectionHomeNews";
import SectionHomeSearch from "@/components/SectionHomeSearch";
import SectionHomeTopics from "@/components/SectionHomeTopics";
import SectionHomeVanBan from "@/components/SectionHomeVanBan";
import Infringe from "@/types/infringe/Infringe";
import { IS_NEXT_RESPONSE_EMPTY } from "@/utils/constants";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { parse } from "rss-to-json";

type Result = {
  rows: Infringe[];
  count: number;
  total_pages: number;
};

export default function Home({ newsData }: any) {
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
          {/* <SectionHomeVanBan /> */}
          <SectionHomeNews newsData={newsData} />
        </MainLayout>
      </AuthNotFound>
    </Fragment>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    var rss = await parse("https://luatvietnam.vn/rss/news-863.rss");

    return {
      props: { newsData: JSON.stringify(rss) },
    };
  } catch (error) {}
  return {
    props: {
      data: IS_NEXT_RESPONSE_EMPTY,
    },
  };
};
