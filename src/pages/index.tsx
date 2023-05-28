import groupViolationApi from "@/api/groupViolation.api";
import newsApi from "@/api/news.api";
import violationApi from "@/api/violation.api";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import Select from "@/components/common/Select";
import InfringeModal from "@/components/InfringeModal";
import MainLayout from "@/components/layouts/MainLayout";
import SectionHomeNews from "@/components/SectionHomeNews";
import SectionHomeVanBan from "@/components/SectionHomeVanBan";
import API from "@/config/api";
import useComponentVisible from "@/hooks/useComponentVisible";
import useQueryString from "@/hooks/useQueryString";
import Infringe from "@/types/infringe/Infringe";
import News from "@/types/news/News";
import PaginationResponse from "@/types/response/PaginationResponse";
import Violation from "@/types/violation/Violation";
import {
  DEFAULT_LIMIT,
  PAGINATION_RESPONSE_EMPTY,
  PUBLIC_ROUTES,
} from "@/utils/constants";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import Page from "./tro-chuyen";
import { GrFormNextLink } from "react-icons/gr";
import { BsNewspaper } from "react-icons/bs";
import { RiQuestionnaireLine } from "react-icons/ri";
import { VscLaw } from "react-icons/vsc";
import SectionHomeSearch from "@/components/SectionHomeSearch";
import SectionHomeTopics from "@/components/SectionHomeTopics";

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
      <MainLayout onlyChildren={true}>
        <SectionHomeSearch />
        <SectionHomeTopics />
        <SectionHomeVanBan />
        <SectionHomeNews />
      </MainLayout>
    </Fragment>
  );
}
