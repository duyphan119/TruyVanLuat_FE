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
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaSearch } from "react-icons/fa";
import Flex from "./common/Flex";
import Input from "./common/Input";

type Props = {};

const SearchHeader = (props: Props) => {
  const router = useRouter();

  const { getString } = useQueryString();

  const keyword_string = getString("keyword");

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [keyword, setKeyword] = useState<string>(keyword_string);

  const [searchData, setSearchData] = useState<PaginationResponse<Violation>>(
    PAGINATION_RESPONSE_EMPTY
  );

  const fetchSearch = async () => {
    try {
      if (keyword === "") setSearchData(PAGINATION_RESPONSE_EMPTY);
      else {
        const data = await violationApi.getAll({
          keyword,
          limit: DEFAULT_LIMIT,
        });
        if (data.count > 0) {
          setIsComponentVisible(true);
        }
        setSearchData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${PUBLIC_ROUTES.SEARCH}?keyword=${keyword}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (keyword !== keyword_string) fetchSearch();
    }, 555);

    return () => clearTimeout(timerId);
  }, [keyword, keyword_string]);

  useEffect(() => {
    setKeyword(keyword_string);
  }, [keyword_string]);

  return (
    <Fragment>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
        ref={ref}
      >
        <Input
          type="search"
          startIcon={FaSearch}
          placeholder="Nhập từ khoá về nội dung vi phạm cần tìm..."
          value={keyword}
          onChange={handleChange}
          ref={inputRef}
          // inputClassName="!border-gray-300 focus:border-[var(--mainColor)]"
        />
      </form>
      {isComponentVisible && searchData.count > 0 ? (
        <div className="absolute top-full right-0 left-0 bg-white shadow-md shadow-gray-400">
          <Flex className="max-h-[320px] overflow-y-auto flex-col !items-start !gap-2 py-2">
            {searchData.rows.map((row, index) => {
              return (
                <Link
                  href={`${PUBLIC_ROUTES.VIOLATIONS}/${row.id}`}
                  className={`group px-2 block w-full${
                    index > 0 ? " border-t border-t-neutral-500 pt-2" : ""
                  }`}
                  key={row.id}
                  title={row.content}
                >
                  <p className="three-dot three-dot-2 text-sm font-medium group-hover:text-[var(--mainColor)]">
                    {row.content}
                  </p>
                  <p className="mt-1 text-[12px] text-rose-500">
                    {row.punishment}
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
    </Fragment>
  );
};

export default SearchHeader;
