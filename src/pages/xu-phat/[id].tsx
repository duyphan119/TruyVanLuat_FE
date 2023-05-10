import Container from "@/components/common/Container";
import MainLayout from "@/components/layouts/MainLayout";
import Head from "next/head";
import { Fragment } from "react";
import { GetServerSidePropsContext } from "next";
import API from "@/config/api";
import Chapter from "@/types/chapter/Chapter";
import Dieu from "@/types/dieu/Dieu";

type Props = {
  dieus: Dieu[];
  contentHtml: string;
};

const Page = ({ dieus, contentHtml }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>Các mức xử phạt vi phạm luật giao thông đường bộ</title>
      </Head>
      <MainLayout>
        <Container>
          <h1 className="text-center mt-4 text-2xl max-w-96 mx-auto">
            <b>NGHỊ ĐỊNH</b>
            <br />
            QUY ĐỊNH XỬ PHẠT VI PHẠM HÀNH CHÍNH
            <br />
            TRONG LĨNH VỰC GIAO THÔNG ĐƯỜNG BỘ VÀ ĐƯỜNG SẮT
          </h1>
          <div className="flex gap-4 my-4 items-stretch">
            <div className="left flex-[1] border border-gray-300 rounded-sm">
              <div className="p-2 bg-indigo-300">MỤC LỤC</div>
              <ul className="py-2 flex flex-col gap-2">
                {dieus.map((dieu, index) => {
                  return (
                    <li className="px-2" key={index}>
                      <a
                        href={`#${dieu.id}`}
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
                                  href={`#${khoan.id}`}
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
  const { id } = context.query;
  let dieus = [];
  let contentHtml = "";
  if (id) {
    try {
      const { dieus: data } = await api.get("punishments/menu/" + id);
      const { html } = await api.get("punishments/" + id);
      dieus = data;
      contentHtml = html;
    } catch (error) {
      console.log("Error", error);
    }
  }

  return {
    props: {
      dieus,
      contentHtml,
    },
  };
};

export default Page;
