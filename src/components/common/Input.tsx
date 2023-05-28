import { ChangeEvent, forwardRef, FocusEvent } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { IconType } from "react-icons/lib";

type Props = {
  id?: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register?: UseFormRegisterReturn;
  errors?: FieldErrors;
  placeholder?: string;
  size?: "small" | "medium";
  value?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  startIcon?: IconType;
  endIcon?: IconType;
  direction?: "vertical" | "horizontal";
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};
const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id = "id",
      label,
      type,
      disabled,
      required,
      register,
      errors,
      placeholder = " ",
      size = "small",
      value,
      onChange,
      startIcon: StartIcon,
      endIcon: EndIcon,
      direction = "horizontal",
      className = "",
      inputClassName = "",
      labelClassName = "",
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const errorElement = () => {
      if (errors && errors[id]) {
        return (
          <div className="text-red-500 text-xs ml-[1px]">
            {errors[id]?.message?.toString()}
          </div>
        );
      }
      return null;
    };
    return (
      <div
        className={`w-full relative flex ${
          direction === "vertical" ? "flex-col" : "items-center"
        } gap-1 ${className}`}
      >
        {label ? (
          <label htmlFor={id} className={`text-sm ${labelClassName}`}>
            {label}
            {required ? <span className="text-red-500 ml-1">*</span> : ""}
          </label>
        ) : null}
        {StartIcon ? (
          <StartIcon
            size={size === "medium" ? 24 : 12}
            className={`text-neutral-500 absolute ${
              size === "medium" ? "top-5 left-3" : "top-3 left-3"
            }`}
          />
        ) : null}
        <input
          id={id}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          className={`
          w-full
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          disabled:opacity-70
          disabled:cursor-not-allowed
          placeholder:text-gray-500
          border-gray-500
          ${size === "small" ? "p-2 pr-2 text-xs" : "p-4"}
          ${StartIcon && size === "small" ? "pl-8" : ""}
          ${StartIcon && size === "medium" ? "pl-12" : ""}
          ${inputClassName}
          `}
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...register}
        />
        {errorElement()}
      </div>
    );
  }
);

export default Input;
