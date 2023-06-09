import groupTrafficSignApi from "@/api/groupTrafficSign.api";
import CreateGroupTrafficSignDTO from "@/types/groupTrafficSign/CreateGroupTrafficSignDTO";
import GroupTrafficSign from "@/types/groupTrafficSign/GroupTrafficSign";
import useToastStore from "@/zustand/toastStore";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";

type Props = {
  data?: GroupTrafficSign;
};

const GroupTrafficSignForm = ({ data }: Props) => {
  const router = useRouter();

  const { show } = useToastStore();

  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [formMessage, setFormMessage] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: data ? data.name : "",
      effect: data ? data.effect : "",
      description: data ? data.description : "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    setSubmitLoading(true);
    const formData = {
      ...values,
    };
    if (data) {
      // Edit
    } else {
      groupTrafficSignApi
        .createOne(formData as CreateGroupTrafficSignDTO)
        .then((res) => {
          console.log("res", res);
          show({
            text: "Thêm nhóm biển báo giao thông thành công",
            title: "Thành công",
            type: "success",
          });
          reset();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    }
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-4">
      <div className="md:col-span-9 col-span-12 grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <label htmlFor="name" className="block">
            Tên
          </label>
          <input
            id="name"
            className="border border-neutral-500 outline-[var(--mainColor)] rounded-sm p-2 w-full"
            placeholder="Nhập tên"
            {...register("name", {
              required: {
                value: true,
                message: "Tên không được để trống",
              },
            })}
          />
          {errors["name"] ? (
            <p className="text-rose-500 mt-1 text-[10px] pl-1">
              {`${errors["name"]["message"]}`}
            </p>
          ) : null}
        </div>
        <div className="col-span-12">
          <label htmlFor="effect" className="block">
            Tác dụng
          </label>
          <input
            id="effect"
            className="border border-neutral-500 outline-[var(--mainColor)] rounded-sm p-2 w-full"
            placeholder="Nhập tác dụng"
            {...register("effect", {
              required: {
                value: true,
                message: "Tác dụng không được để trống",
              },
            })}
          />
          {errors["effect"] ? (
            <p className="text-rose-500 mt-1 text-[10px] pl-1">
              {`${errors["effect"]["message"]}`}
            </p>
          ) : null}
        </div>
        <div className="col-span-12">
          <label htmlFor="description" className="block">
            Mô tả
          </label>
          <input
            id="description"
            className="border border-neutral-500 outline-[var(--mainColor)] rounded-sm p-2 w-full"
            placeholder="Nhập mô tả"
            {...register("description")}
          />
          {errors["description"] ? (
            <p className="text-rose-500 mt-1 text-[10px] pl-1">
              {`${errors["description"]["message"]}`}
            </p>
          ) : null}
        </div>
      </div>
      <div className="md:col-span-3 md:border-l md:border-l-neutral-400 pl-4 col-span-12 border-l-0">
        <div className="flex gap-4">
          <Button type="button" color="default" onClick={() => router.back()}>
            Quay lại
          </Button>
          <Button type="submit">{submitLoading ? "Đang xử lý" : "Thêm"}</Button>
        </div>
      </div>
    </form>
  );
};

export default GroupTrafficSignForm;
