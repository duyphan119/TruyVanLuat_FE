import groupTrafficSignApi from "@/api/groupTrafficSign.api";
import CreateGroupTrafficSignDTO from "@/types/groupTrafficSign/CreateGroupTrafficSignDTO";
import TrafficSign from "@/types/trafficSign/TrafficSign";
import useToastStore from "@/zustand/toastStore";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../common/Button";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import Image from "next/image";
import CreateTrafficSignDTO from "@/types/trafficSign/CreateTrafficSignDTO";
import GroupTrafficSign from "@/types/groupTrafficSign/GroupTrafficSign";
import trafficSignApi from "@/api/trafficSign.api";

type Props = {
  data?: TrafficSign;
  groupTrafficSigns: GroupTrafficSign[];
};

const uploader = Uploader({
  apiKey: "public_FW25bPnAMY5AGK6PpYe6xz5W7TiC",
});

const TrafficSignForm = ({ data, groupTrafficSigns }: Props) => {
  const router = useRouter();

  const { show } = useToastStore();
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [formMessage, setFormMessage] = React.useState("");
  const [image, setImage] = React.useState(data ? data.image : "");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      name: data ? data.name : "",
      code: data ? data.code : "",
      description: data ? data.description : "",
      groupTrafficSignId: data ? data.groupTrafficSignId : "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    setSubmitLoading(true);
    const formData = {
      ...values,
      image,
    };
    if (data) {
      // Edit
    } else {
      trafficSignApi
        .createOne(formData as CreateTrafficSignDTO)
        .then((res) => {
          console.log("res", res);
          show({
            text: "Thêm biển báo giao thông thành công",
            title: "Thành công",
            type: "success",
          });
          setImage("");
          // reset();
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
          <label htmlFor="groupTrafficSignId" className="block">
            Nhóm biển báo
          </label>
          <select
            id="groupTrafficSignId"
            className="border border-neutral-500 outline-[var(--mainColor)] rounded-sm p-2 w-full"
            {...register("groupTrafficSignId", {
              required: {
                value: true,
                message: "Nhóm biển báo không được để trống",
              },
            })}
          >
            <option value="">Chọn nhóm biển báo</option>
            {groupTrafficSigns.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {errors["groupTrafficSignId"] ? (
            <p className="text-rose-500 mt-1 text-[10px] pl-1">
              {`${errors["groupTrafficSignId"]["message"]}`}
            </p>
          ) : null}
        </div>
        <div className="col-span-12">
          <label htmlFor="code" className="block">
            Mã số
          </label>
          <input
            id="code"
            className="border border-neutral-500 outline-[var(--mainColor)] rounded-sm p-2 w-full"
            placeholder="Nhập mã số"
            {...register("code", {
              required: {
                value: true,
                message: "Mã số không được để trống",
              },
            })}
          />
          {errors["code"] ? (
            <p className="text-rose-500 mt-1 text-[10px] pl-1">
              {`${errors["code"]["message"]}`}
            </p>
          ) : null}
        </div>
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
        <div className="mb-4">
          <UploadButton
            uploader={uploader}
            options={{ multi: true }}
            onComplete={(files) => {
              const listFileUrl: string[] = files.map((x) => x.fileUrl);
              if (listFileUrl.length > 0) {
                setImage(listFileUrl[0]);
              }
            }}
          >
            {({ onClick }) => (
              <button
                onClick={onClick}
                className="relative w-40 h-40 overflow-hidden flex items-center justify-center border border-dashed border-neutral-700 rounded-md"
              >
                {image !== "" ? (
                  <Image
                    src={image}
                    alt="Image"
                    width={160}
                    height={160}
                    priority={true}
                  />
                ) : (
                  "Tải ảnh lên"
                )}
              </button>
            )}
          </UploadButton>
        </div>
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

export default TrafficSignForm;
