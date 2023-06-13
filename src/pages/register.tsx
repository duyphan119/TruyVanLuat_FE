import AuthNotFound from "@/components/auth/AuthNotFound";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import GroupRadio from "@/components/common/GroupRadio";
import Input from "@/components/common/Input";
import MainLayout from "@/components/layouts/MainLayout";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Props = {};

const Page = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    console.log("Submit::", values);
  };

  return (
    <Fragment>
      <Head>
        <title>Đăng ký thành viên</title>
      </Head>
      <MainLayout>
        <Container className="flex-1 flex items-center h-full">
          <div className="flex-1 flex flex-col items-center gap-8">
            <h1 className="text-2xl uppercase">Đăng ký thành viên</h1>
            <form
              className="flex flex-col items-center gap-4 text-sm w-80"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full">
                <Input
                  placeholder="Nhập họ tên"
                  id="fullName"
                  register={register("fullName", {
                    required: {
                      value: true,
                      message: "Họ tên không được để trống",
                    },
                  })}
                  required={true}
                  label="Họ tên"
                  errors={errors}
                  inputClassName="w-56 ml-auto"
                  className="gap-0"
                />
              </div>
              <div className="w-full">
                <Input
                  placeholder="Nhập địa chỉ email"
                  id="email"
                  register={register("email", {
                    required: {
                      value: true,
                      message: "Địa chỉ email không được để trống",
                    },
                  })}
                  required={true}
                  label="Địa chỉ Email"
                  errors={errors}
                  inputClassName="w-56 ml-auto"
                  className="gap-0"
                  type="email"
                />
              </div>
              <div className="w-full">
                <Input
                  placeholder="Nhập mật khẩu"
                  type="password"
                  register={register("password", {
                    required: {
                      value: true,
                      message: "Mật khẩu không được để trống",
                    },
                  })}
                  required={true}
                  label="Mật khẩu"
                  errors={errors}
                  inputClassName="w-56 ml-auto"
                  className="gap-0"
                />
              </div>
              <div className="w-full">
                <div className="flex items-center">
                  <div className="">Giới tính</div>
                  <div className="w-56 ml-auto">
                    <GroupRadio
                      items={[
                        {
                          label: "Nam",
                          value: "Nam",
                          defaultChecked: true,
                        },
                        {
                          label: "Nữ",
                          value: "Nữ",
                        },
                        {
                          label: "Khác",
                          value: "Khác",
                        },
                      ]}
                      name="gender"
                      register={register}
                      itemClassName="text-sm text-gray-500"
                      dotClassName="border-gray-500"
                      labelClassName="peer-checked:text-[var(--mainColor)]"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <Input
                  placeholder="Nhập số điện thoại"
                  register={register("phone", {
                    required: {
                      value: true,
                      message: "Số điện thoại không được để trống",
                    },
                  })}
                  required={true}
                  label="Điện thoại"
                  errors={errors}
                  inputClassName="w-56 ml-auto"
                  className="gap-0"
                  id="phone"
                />
              </div>
              <div className="w-full flex items-center justify-between text-[var(--mainColor)]">
                <Link href="/" className="hover:underline">
                  Quên mật khẩu ?
                </Link>
                <Link href="/" className="hover:underline">
                  Đăng nhập
                </Link>
              </div>
              <Button type="submit" className="w-full">
                Đăng ký
              </Button>
              <div className="w-full text-center">Hoặc</div>
              <Button className="w-full !bg-rose-500 !border-rose-500 hover:!text-white !hover:bg-rose-500">
                Đăng nhập bằng Google
              </Button>
              <Button className="w-full !bg-blue-500 !border-blue-500 hover:!text-white !hover:bg-blue-500">
                Đăng nhập bằng Facebook
              </Button>
            </form>
          </div>
          <div className="flex-1">right</div>
        </Container>
      </MainLayout>
    </Fragment>
  );
};

export default Page;
