import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  style?: React.CSSProperties;
};

const Paper = ({ children, className, title, style }: Props) => {
  return (
    <div
      className={`bg-white rounded-sm h-full shadow p-4 ${className || ""}`}
      style={{ ...style }}
    >
      {title ? (
        <h3 className="mb-4 pb-2 border-b border-b-neutral-400 font-semibold">
          {title}
        </h3>
      ) : null}
      {children}
    </div>
  );
};

export default Paper;
