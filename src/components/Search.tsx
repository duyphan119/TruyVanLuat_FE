import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Input from "./common/Input";
import { FaSearch } from "react-icons/fa";

type Props = {
  formClassName?: string;
};

const Search = ({ formClassName }: Props) => {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (navigate?: boolean) => {
    if (navigate) {
      router.push(`/search?keyword=${keyword}`);
    } else {
      // Gọi api search tại đây
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSearch(true);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      keyword !== "" && handleSearch();
    }, 543);

    return () => clearTimeout(timerId);
  }, [keyword]);

  return (
    <form className={`w-72 ${formClassName || ""}`} onSubmit={handleSubmit}>
      <Input
        type="search"
        size="small"
        placeholder="Tìm kiếm ..."
        value={keyword}
        onChange={handleChange}
        startIcon={FaSearch}
      />
    </form>
  );
};

export default Search;
