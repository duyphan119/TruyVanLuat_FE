import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={`container lg:max-w-5xl xl:max-w-7xl md:max-w-3xl mx-auto ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
