import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import MainLayout from "@/components/layouts/MainLayout";
import API from "@/config/api";
import useComponentVisible from "@/hooks/useComponentVisible";
import Dieu from "@/types/dieu/Dieu";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { BiMenu } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

type Props = {
  dieus: Dieu[];
  contentHtml: string;
};

const Page = ({ dieus, contentHtml }: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const drawer = (
    <div
      className="menu-drawer left flex-[1] border border-gray-300 rounded-sm md:hidden fixed top-0 bottom-0 left-0 max-w-[80vw] bg-white -translate-x-full transition"
      ref={ref}
    >
      <Flex className="p-2 bg-indigo-300 justify-between">
        <span>MỤC LỤC</span>
        <label htmlFor="menu-drawer" className="cursor-pointer">
          <GrClose />
        </label>
      </Flex>
      <ul className="py-2 flex flex-col gap-2">
        {dieus.map((dieu, index) => {
          return (
            <li className="px-2" key={index}>
              <a
                href={`#${dieu.code}`}
                className="hover:text-indigo-500 font-semibold "
              >
                {dieu.title}
              </a>
              {dieu.khoans.length > 0 ? (
                <ol className="mt-1 text-sm text-left">
                  {dieu.khoans.map((khoan, index) => {
                    return (
                      <li className="py-2" key={index}>
                        <a
                          href={`#${khoan.code}`}
                          className="hover:text-indigo-500 text-justify"
                        >
                          {khoan.title}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <Fragment>
      <Head>
        <title>Các mức xử phạt vi phạm luật giao thông đường bộ</title>
      </Head>
      <MainLayout>
        <Container className="py-4">
          <label
            className="cursor-pointer inline-flex items-center xl:hidden"
            htmlFor="menu-drawer"
          >
            <BiMenu fontSize={20} />
          </label>
          <input
            type="checkbox"
            id="menu-drawer"
            hidden
            className="[&:checked+.menu-drawer]:translate-x-0"
            checked={isComponentVisible}
            onChange={(e) => setIsComponentVisible(e.target.checked)}
          />
          {drawer}
          <div className="flex gap-4 my-4 items-stretch">
            <div className="left flex-[1] border border-gray-300 rounded-sm xl:block hidden">
              <Flex className="p-2 bg-indigo-300 justify-between">
                <span>MỤC LỤC</span>
              </Flex>
              <ul className="py-2 flex flex-col gap-2">
                {dieus.map((dieu, index) => {
                  return (
                    <li className="px-2" key={index}>
                      <a
                        href={`#${dieu.code}`}
                        className="hover:text-indigo-500 font-semibold "
                      >
                        {dieu.title}
                      </a>
                      {dieu.khoans.length > 0 ? (
                        <ol className="mt-1 text-sm text-left">
                          {dieu.khoans.map((khoan, index) => {
                            return (
                              <li className="py-2" key={index}>
                                <a
                                  href={`#${khoan.code}`}
                                  className="hover:text-indigo-500 text-justify"
                                >
                                  {khoan.title}
                                </a>
                              </li>
                            );
                          })}
                        </ol>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="right flex-[3] p-2 border border-gray-300 rounded-sm">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              ></div>
            </div>
          </div>
        </Container>
      </MainLayout>
    </Fragment>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const api = new API();
  let { id: idParams } = context.query;
  let dieus = [];
  let contentHtml = "";
  const id = idParams ? `${idParams}` : 100;
  try {
    const vanBan = await api.get("vanban/" + id);
    if (vanBan) {
      dieus = vanBan.dieus;
      contentHtml = vanBan.html;
    }
  } catch (error) {
    console.log("Error", error);
  }

  return {
    props: {
      dieus,
      contentHtml,
    },
  };
};

export default Page;
