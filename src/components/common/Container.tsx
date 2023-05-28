import { ReactNode, CSSProperties } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Container = ({ children, className, style }: Props) => {
  return (
    <div
      className={`container lg:max-w-5xl xl:max-w-7xl md:max-w-3xl mx-auto ${
        className || ""
      }`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Container;
