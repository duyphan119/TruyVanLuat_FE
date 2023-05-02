import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

const Flex = ({ children, className = "" }: Props) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>{children}</div>
  );
};

export default Flex;
