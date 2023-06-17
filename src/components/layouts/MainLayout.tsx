import { HEADER_HEIGHT, PUBLIC_ROUTES } from "@/utils/constants";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isAtHomePage = pathname === PUBLIC_ROUTES.HOME;
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
              paddingTop: isAtHomePage ? HEADER_HEIGHT : 0,
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
