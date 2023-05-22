import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import Input from "./common/Input";

type Props = {};

const SearchHeader = (props: Props) => {
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { keyword } = values;
    router.push(`search?keyword=${keyword}`);
  };
  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="search"
        startIcon={FaSearch}
        placeholder="Nhập từ khoá cần tìm..."
        register={register("keyword")}
        id="keyword"
        // inputClassName="!border-gray-300 focus:border-indigo-500"
      />
    </form>
  );
};

export default SearchHeader;
