import Link from "next/link";
import { ReactNode } from "react";
import styles from "@/components/styles/Button.module.css";

type Props = {
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "button";
  color?: "primary" | "error";
  variant?: "contained" | "outlined";
  onClick?: () => void;
  href?: string;
  title?: string;
  newCss?: boolean;
};

const Button = ({
  children,
  disabled,
  className = "",
  type = "button",
  color = "primary",
  variant = "contained",
  onClick,
  href,
  title,
  newCss,
}: Props) => {
  const wrapperClassName = `
        border
        cursor-pointer
        bg-[var(--mainColor)] border-[var(--mainColor)] hover:bg-white hover:text-[var(--mainColor)]
        ${
          color === "error"
            ? "bg-rose-500 border-rose-500 hover:bg-white hover:text-rose-500"
            : ""
        }
        ${
          variant === "outlined"
            ? `bg-transparent ${
                color === "error" ? "text-rose-500" : "text-[var(--mainColor)]"
              }`
            : "text-white"
        }
        rounded-md
        py-2 px-4
        ${className}
        `;

  const button = (
    <button
      type={type}
      disabled={disabled}
      className={
        newCss ? `${styles.button} ${className || ""}` : wrapperClassName
      }
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );

  return href ? <Link href={href}>{button}</Link> : button;
};

export default Button;
