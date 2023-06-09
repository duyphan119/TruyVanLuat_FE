import { HEADER_HEIGHT } from "@/utils/constants";
import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";

type Props = {
  children?: ReactNode;
  hideFooter?: boolean;
  onlyChildren?: boolean;
  contentClassName?: string;
};

const MainLayout = ({
  children,
  hideFooter = false,
  onlyChildren,
  contentClassName = "",
}: Props) => {
  return (
    <div className={`flex flex-col min-h-screen`}>
      <Header />
      <main>
        {onlyChildren ? (
          children
        ) : (
          <div
            className={contentClassName}
            style={{
              paddingTop: HEADER_HEIGHT,
              ...(hideFooter
                ? {}
                : {
                    minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
                  }),
            }}
          >
            {children}
          </div>
        )}
        {hideFooter ? null : <Footer />}
      </main>
    </div>
  );
};

export default MainLayout;
