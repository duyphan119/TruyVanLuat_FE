import { ReactNode } from "react";
import Header from "../Header";

type Props = {
  children?: ReactNode;
  contentBackground?: string;
};

const MainLayout = ({ children, contentBackground = "" }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className={`flex-1 flex flex-col bg-[#fffefb] ${contentBackground} `}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
