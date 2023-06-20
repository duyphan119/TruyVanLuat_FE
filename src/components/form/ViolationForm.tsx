import violationApi from "@/api/violation.api";
import Violation from "@/types/violation/Violation";
import useToastStore from "@/zustand/toastStore";
import { useRouter } from "next/router";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../common/Button";

type Props = {
  data?: Violation;
};

const ViolationForm = ({ data }: Props) => {
  return <></>;
  //   const router = useRouter();
  //   const { show } = useToastStore();
  //   const [submitLoading, setSubmitLoading] = React.useState(false);
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //     reset,
  //     setValue,
  //     getValues,
  //   } = useForm<FieldValues>({
  //     defaultValues: {
  //       content: data ? data.content : "",
  //       legal: data ? data.legal : "",
  //       keywords: data ? data.keywords : "",
  //       fine: data ? data.fine : "",
  //       violator: data ? data.violator : "Cá nhân",
  //     },
  //   });
  //   const onSubmit: SubmitHandler<FieldValues> = (values) => {
  //     setSubmitLoading(true);
  //     console.log(values);
  //     if (data) {
  //       violationApi
  //         .updateOne(data.id, values)
  //         .then((res) => {
  //           if (res.is_success) {
  //             show({
  //               text: "Sửa thông tin xử phạt thành công",
  //               title: "Thành công",
  //               type: "success",
  //             });
  //           }
  //         })
  //         .catch((error) => {
  //           show({
  //             text: "Có lỗi xảy ra, vui lòng thử lạis",
  //             title: "Thất bại",
  //             type: "error",
  //           });
  //         })
  //         .finally(() => {
  //           setSubmitLoading(false);
  //         });
  //     }
  //   };
  //   return (
  //     <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-4">
  //       <div className="md:col-span-9 col-span-12 grid grid-cols-12 gap-4">
  //         <div className="col-span-12">
  //           <label htmlFor="legal" className="block">
  //             Điều khoản
  //           </label>
  //           <input
  //             autoComplete="off"
  //             id="legal"
  //             className="border border-neutral-500 outline-[var(--mainColor)] rounded-sm p-2 w-full"
  //             placeholder="Nhập điều khoản"
  //             {...register("legal", {
  //               required: {
  //                 value: true,
  //                 message: "Điều khoản không được để trống",
  //               },
  //             })}
  //           />
  //           {errors["legal"] ? (
  //             <p className="text-rose-500 mt-1 text-[10px] pl-1">
  //               {`${errors["legal"]["message"]}`}
  //             </p>
  //           ) : null}
  //         </div>
  //         <div className="col-span-12">
  //           <label htmlFor="violator" className="block">
  //             Đối tượng xử phạt
  //           </label>
  //           <input
  //             autoComplete="off"
  //             id="violator"
  //             className="border border-neutral-500 outline-[var(--mainColor)] rounded-sm p-2 w-full"
  //             placeholder="Nhập đối tượng xử phạt"
  //             {...register("violator", {
  //               required: {
  //                 value: true,
  //                 message: "Đối tượng xử phạt không được để trống",
  //               },
  //             })}
  //           />
  //           {errors["violator"] ? (
  //             <p className="text-rose-500 mt-1 text-[10px] pl-1">
  //               {`${errors["violator"]["message"]}`}
  //             </p>
  //           ) : null}
  //         </div>
  //         <div className="col-span-12">
  //           <label htmlFor="fine" className="block">
  //             Hình phạt
  //           </label>
  //           <input
  //             autoComplete="off"
  //             id="fine"
  //             className="border border-neutral-500 outline-[var(--mainColor)] rounded-sm p-2 w-full"
  //             placeholder="Nhập hình phạt"
  //             {...register("fine", {
  //               required: {
  //                 value: true,
  //                 message: "Hình phạt không được để trống",
  //               },
  //             })}
  //           />
  //           {errors["fine"] ? (
  //             <p className="text-rose-500 mt-1 text-[10px] pl-1">
  //               {`${errors["fine"]["message"]}`}
  //             </p>
  //           ) : null}
  //         </div>
  //         <div className="col-span-12">
  //           <label htmlFor="content" className="block">
  //             Nội dung
  //           </label>
  //           <input
  //             autoComplete="off"
  //             id="content"
  //             className="border border-neutral-500 outline-[var(--mainColor)] rounded-sm p-2 w-full"
  //             placeholder="Nhập nội dung"
  //             {...register("content", {
  //               required: {
  //                 value: true,
  //                 message: "Nội dung không được để trống",
  //               },
  //             })}
  //           />
  //           {errors["content"] ? (
  //             <p className="text-rose-500 mt-1 text-[10px] pl-1">
  //               {`${errors["content"]["message"]}`}
  //             </p>
  //           ) : null}
  //         </div>
  //         <div className="col-span-12">
  //           <label htmlFor="note" className="block">
  //             Ghi chú
  //           </label>
  //           <input
  //             autoComplete="off"
  //             id="note"
  //             className="border border-neutral-500 outline-[var(--mainColor)] rounded-sm p-2 w-full"
  //             placeholder="Nhập ghi chú"
  //             {...register("note")}
  //           />
  //         </div>
  //         <div className="col-span-12">
  //           <label htmlFor="keywords" className="block">
  //             Từ khoá
  //           </label>
  //           <input
  //             autoComplete="off"
  //             id="keywords"
  //             className="border border-neutral-500 outline-[var(--mainColor)] rounded-sm p-2 w-full"
  //             placeholder="Nhập từ khoá"
  //             {...register("keywords")}
  //           />
  //         </div>
  //       </div>
  //       <div className="md:col-span-3 md:border-l md:border-l-neutral-400 pl-4 col-span-12 border-l-0">
  //         <div className="flex gap-4">
  //           <Button type="button" color="default" onClick={() => router.back()}>
  //             Quay lại
  //           </Button>
  //           <Button type="submit">
  //             {submitLoading ? "Đang xử lý" : data ? "Sửa" : "Thêm"}
  //           </Button>
  //         </div>
  //       </div>
  //     </form>
  //   );
};

export default ViolationForm;
