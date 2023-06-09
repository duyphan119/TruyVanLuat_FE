import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsSendFill } from "react-icons/bs";
import Button from "../common/Button";

type Props = {
  onSend: (keyword: string) => void;
};

const ChatForm = ({ onSend }: Props) => {
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { keyword } = values;
    onSend(keyword);
    setValue("keyword", "");
  };

  const { register, handleSubmit, setValue } = useForm();

  return (
    <form
      className="flex items-center p-3 border-t border-t-[var(--mainColor)] gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="search"
        className="outline-none flex-1 p-2 text-sm bg-inherit border hover:border-[var(--mainColor)] focus:border-[var(--mainColor)] rounded-sm"
        placeholder="Hỏi tôi điều gì đó về luật giao thông đường bộ..."
        autoComplete="off"
        {...register("keyword")}
      />
      <Button className="self-stretch" type="submit">
        <BsSendFill />
      </Button>
    </form>
  );
};

export default ChatForm;
