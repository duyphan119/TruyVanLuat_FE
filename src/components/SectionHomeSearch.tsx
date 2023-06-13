import violationApi from "@/api/violation.api";
import useComponentVisible from "@/hooks/useComponentVisible";
import useQueryString from "@/hooks/useQueryString";
import PaginationResponse from "@/types/response/PaginationResponse";
import Violation from "@/types/violation/Violation";
import {
  DEFAULT_LIMIT,
  PAGINATION_RESPONSE_EMPTY,
  PUBLIC_ROUTES,
} from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
  FocusEvent,
} from "react";
import { FaSearch } from "react-icons/fa";
import Container from "./common/Container";
import Flex from "./common/Flex";

type Props = {};

const SectionHomeSearch = (props: Props) => {
  const router = useRouter();

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [keyword, setKeyword] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [searchData, setSearchData] = useState<PaginationResponse<Violation>>(
    PAGINATION_RESPONSE_EMPTY
  );

  const fetchSearch = async () => {
    try {
      if (keyword === "") setSearchData(PAGINATION_RESPONSE_EMPTY);
      else {
        const data = await violationApi.search(keyword, 1, DEFAULT_LIMIT);
        if (data.count > 0) {
          setIsComponentVisible(true);
        }
        setSearchData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFocus = async (e: FocusEvent<HTMLInputElement>) => {
    setIsComponentVisible(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (isSubmitted) {
      router.push(`${PUBLIC_ROUTES.SEARCH}?keyword=${keyword}`);
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (!isSubmitted) {
      const timerId = setTimeout(() => {
        fetchSearch();
      }, 555);

      return () => clearTimeout(timerId);
    }
  }, [isSubmitted, keyword]);

  return (
    <section className="section-search w-full h-[560px] bg-home relative text-white">
      <Container className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-[50px] text-center px-3 mb-3">
          Hỗ trợ tra cứu <b>Luật Giao thông Đường bộ</b>
        </h2>
        <h6 className="text-lg text-center px-6 mb-10 font-thin">
          - Công cụ tìm kiếm hữu ích -
        </h6>
        <form
          className="rounded-md border-2 border-white flex items-center w-[720px] mx-auto relative"
          ref={ref}
          onSubmit={handleSubmit}
        >
          <input
            className="h-14 flex-1 text-lg pl-4 bg-transparent outline-none placeholder:text-white"
            style={{ lineHeight: "56px" }}
            placeholder="Tìm kiếm tại đây ..."
            autoComplete="off"
            ref={inputRef}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <div className="bg-white h-8 w-[2px]"></div>
          <button type="submit" className="flex justify-center px-4 text-xl">
            <FaSearch />
          </button>
          {isComponentVisible && searchData.count > 0 ? (
            <div className="absolute top-full right-0 left-0 bg-white shadow-md shadow-gray-400 text-neutral-700">
              <Flex className="max-h-[236px] overflow-y-auto flex-col !items-start !gap-2 py-2">
                {searchData.rows.map((row, index) => {
                  return (
                    <Link
                      href={`${PUBLIC_ROUTES.VIOLATIONS}/${row.id}`}
                      className={`group px-2 block w-full${
                        index > 0 ? " border-t border-t-neutral-500 pt-2" : ""
                      }`}
                      key={row.id}
                      // title={row.content}
                      // title={row.legal.point.name}
                      title={row.name}
                    >
                      <p className="three-dot three-dot-2 text-sm font-medium group-hover:text-[var(--mainColor)]">
                        {/* {row.content} */}
                        {/* {row.legal.point.name} */}
                        {row.name}
                      </p>
                      <p className="mt-1 text-[12px] text-rose-500">
                        {/* {row.punishment} */}
                        {row.fine}
                      </p>
                    </Link>
                  );
                })}
              </Flex>
              <Link
                href={`${PUBLIC_ROUTES.SEARCH}?keyword=${keyword}`}
                className="block text-center p-1 text-[var(--mainColor)] underline border-t border-t-neutral-300"
                onClick={() => setIsComponentVisible(false)}
                title="Xem tất cả kết quả tìm kiếm"
              >
                Xem tất cả
              </Link>
            </div>
          ) : null}
        </form>
      </Container>
    </section>
  );
};

export default SectionHomeSearch;
