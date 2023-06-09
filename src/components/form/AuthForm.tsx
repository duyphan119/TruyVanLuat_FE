import { useState } from "react";
import authApi from "@/api/auth.api";
import styles from "@/components/styles/AuthForm.module.css";
import RegisterDTO from "@/types/user/RegisterDTO";
import { PUBLIC_ROUTES } from "@/utils/constants";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import LoginDTO from "@/types/user/LoginDTO";
import { useRouter } from "next/navigation";
import useToastStore from "@/zustand/toastStore";

type Props = {
  isRegisterForm?: boolean;
};

const AuthForm = ({ isRegisterForm }: Props) => {
  const router = useRouter();

  const { show } = useToastStore();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      ...(isRegisterForm ? { fullName: "", phone: "" } : {}),
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    setSubmitLoading(true);
    const formData = {
      email: values.email,
      password: values.password,
      ...(isRegisterForm
        ? {
            phone: values.phone,
            full_name: values.fullName,
          }
        : {}),
    };
    if (isRegisterForm) {
      // Đăng ký
      authApi
        .register(formData as RegisterDTO)
        .then((res) => {
          router.push(PUBLIC_ROUTES.HOME);
          show({
            text: "Đăng ký thành công",
            title: "Thành công",
            type: "success",
          });
        })
        .catch((error) => {
          setFormMessage(error.response.data.message);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    } else {
      // Đăng nhập
      authApi
        .login(formData as LoginDTO)
        .then((res) => {
          show({
            text: "Đăng nhập thành công",
            title: "Thành công",
            type: "success",
          });
          router.push(PUBLIC_ROUTES.HOME);
        })
        .catch((error) => {
          setFormMessage(error.response.data.message);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles["form-title"]}>
        {isRegisterForm ? "Đăng ký" : "Đăng nhập"}
      </p>
      {isRegisterForm ? (
        <div className={styles["input-container"]}>
          <input
            type="text"
            placeholder="Nhập họ tên"
            {...register("fullName", {
              required: {
                value: true,
                message: "Họ tên không được để trống",
              },
            })}
          />
          {errors["fullName"] ? (
            <p className="text-rose-500 text-[10px] pl-1">
              {`${errors["fullName"]["message"]}`}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className={styles["input-container"]}>
        <input
          type="email"
          placeholder="Nhập địa chỉ email"
          {...register("email", {
            required: {
              value: true,
              message: "Địa chỉ email không được để trống",
            },
          })}
        />
        {errors["email"] ? (
          <p className="text-rose-500 text-[10px] pl-1">
            {`${errors["email"]["message"]}`}
          </p>
        ) : null}
      </div>
      <div className={styles["input-container"]}>
        <input
          type="password"
          placeholder="Nhập password"
          {...register("password", {
            required: {
              value: true,
              message: "Mật khẩu không được để trống",
            },
          })}
        />
        {errors["password"] ? (
          <p className="text-rose-500 text-[10px] pl-1">
            {`${errors["password"]["message"]}`}
          </p>
        ) : null}
      </div>
      {isRegisterForm ? (
        <div className={styles["input-container"]}>
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            {...register("phone", {
              required: {
                value: true,
                message: "Số điện thoại không được để trống",
              },
            })}
          />
          {errors["phone"] ? (
            <p className="text-rose-500 text-[10px] pl-1">
              {`${errors["phone"]["message"]}`}
            </p>
          ) : null}
        </div>
      ) : null}
      {formMessage !== "" ? (
        <p className="text-rose-500 text-[10px] pl-1 text-center">
          {formMessage}
        </p>
      ) : null}
      <button
        type="submit"
        className={`${styles["submit"]} button ${
          submitLoading ? "loading" : ""
        }`}
      >
        <span className="text">{isRegisterForm ? "Đăng ký" : "Đăng nhập"}</span>
      </button>
      <p className={styles["signup-link"]}>
        {isRegisterForm ? "Đã tài khoản? " : "Không có tài khoản? "}
        <Link
          href={isRegisterForm ? PUBLIC_ROUTES.LOGIN : PUBLIC_ROUTES.REGISTER}
        >
          {isRegisterForm ? "Đăng nhập" : "Đăng ký"}
        </Link>
      </p>
    </form>
  );
};

export default AuthForm;
