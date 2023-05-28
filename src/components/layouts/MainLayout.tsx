import { HEADER_HEIGHT } from "@/utils/constants";
import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";

type Props = {
  children?: ReactNode;
  hideFooter?: boolean;
  onlyChildren?: boolean;
};

const MainLayout = ({ children, hideFooter = false, onlyChildren }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        {onlyChildren ? (
          children
        ) : (
          <div style={{ marginTop: HEADER_HEIGHT }}>{children}</div>
        )}
        {hideFooter ? null : <Footer />}
      </main>
    </div>
  );
};

export default MainLayout;
