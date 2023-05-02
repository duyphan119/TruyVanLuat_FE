import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  direction?: "vertical" | "horizontal";
  items?: Array<{
    label: string;
    value: string | number;
    defaultChecked?: boolean;
  }>;
  name?: string;
  register?: UseFormRegister<FieldValues>;
  required?: boolean;
  itemClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  dotClassName?: string;
  className?: string;
};

const GroupRadio = ({
  direction = "horizontal",
  items,
  name,
  register,
  required,
  className = "",
  itemClassName = "",
  inputClassName = "",
  labelClassName = "",
  dotClassName = "",
}: Props) => {
  return (
    <div
      className={`flex gap-2 ${
        direction === "vertical" ? "flex-col" : ""
      } ${className}`}
    >
      {items?.map((item, index) => {
        const id = `radio${index}`;
        const defaultChecked = item.defaultChecked ? true : false;
        return (
          <div
            className={`flex items-center cursor-pointer ${itemClassName}`}
            key={id}
          >
            <input
              type="radio"
              value={item.value}
              id={id}
              hidden
              {...(register && name ? register(name, { required }) : {})}
              className={`peer ${inputClassName}`}
              defaultChecked={defaultChecked}
            />
            <label
              htmlFor={id}
              className={`w-4 h-4 cursor-pointer rounded-[50px] border border-black peer-checked:p-[1.5px] overflow-hidden peer-checked:bg-indigo-500 bg-clip-content ${dotClassName}`}
            ></label>
            <label
              className={`cursor-pointer pl-2 ${labelClassName}`}
              htmlFor={id}
            >
              {item.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default GroupRadio;
