import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "button";
  color?: "primary" | "error";
  variant?: "contained" | "outlined";
  onClick?: () => void;
};

const Button = ({
  children,
  disabled,
  className = "",
  type = "button",
  color = "primary",
  variant = "contained",
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={` 
        border
        cursor-pointer
        bg-indigo-500 border-indigo-500 hover:bg-white hover:text-indigo-500
        ${
          color === "error"
            ? "bg-rose-500 border-rose-500 hover:bg-white hover:text-rose-500"
            : ""
        }
        ${
          variant === "outlined"
            ? `bg-transparent ${
                color === "error" ? "text-rose-500" : "text-indigo-500"
              }`
            : "text-white"
        }
        rounded-md
        py-2 px-4
        ${className}
        `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
