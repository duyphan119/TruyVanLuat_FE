import useToastStore from "@/zustand/toastStore";
import { useEffect } from "react";
import { BiCheckCircle, BiErrorCircle, BiInfoCircle } from "react-icons/bi";

type Props = {};

const Toast = (props: Props) => {
  const { visible, hide, duration, text, title, type } = useToastStore();

  useEffect(() => {
    if (visible) {
      const timerId = setTimeout(() => {
        hide();
      }, duration);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [visible]);

  return (
    <div
      className={`toast fixed top-24 right-2 bg-white rounded-md p-3 flex gap-2 border border-neutral-200 shadow w-64 max-w-[256px] transition-all duration-500 z-[99999] ${
        visible ? "translate-x-0" : "translate-x-[264px]"
      }`}
    >
      <div
        className={`icon text-xl ${type === "success" ? "text-green-500" : ""}${
          type === "info" ? "text-[var(--mainColor)]" : ""
        }${type === "error" ? "text-rose-500" : ""}`}
      >
        {type === "success" ? <BiCheckCircle /> : null}
        {type === "info" ? <BiInfoCircle /> : null}
        {type === "error" ? <BiErrorCircle /> : null}
      </div>
      <div className="content">
        <div className="heading text-sm font-medium">{title}</div>
        <div className="text text-sm text-neutral-500">{text}</div>
      </div>
    </div>
  );
};

export default Toast;
