import { ReactNode } from "react";
import Header from "../Header";

type Props = {
  children?: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col ">{children}</main>
    </div>
  );
};

export default MainLayout;
