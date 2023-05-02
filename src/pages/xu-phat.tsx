import Container from "@/components/common/Container";
import MainLayout from "@/components/layouts/MainLayout";
import Head from "next/head";
import { Fragment } from "react";
import { GetStaticPropsContext } from "next";
import API from "@/config/api";
import Chapter from "@/types/chapter/Chapter";

type Props = {
  chapters: Chapter[];
  contentHtml: string;
};

const Page = ({ chapters, contentHtml }: Props) => {
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
                {chapters.map((chapter, index) => {
                  return (
                    <li className="px-2" key={index}>
                      <a
                        href={`#${chapter.id}`}
                        className="hover:text-indigo-500 font-semibold "
                      >
                        {chapter.title}
                      </a>
                      {chapter.clauses.length > 0 ? (
                        <ol className="mt-1 text-sm text-left">
                          {chapter.clauses.map((clause, index) => {
                            return (
                              <li className="py-2" key={index}>
                                <a
                                  href={`#${clause.id}`}
                                  className="hover:text-indigo-500 text-justify"
                                >
                                  {clause.title}
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
                className=""
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              ></div>
            </div>
          </div>
        </Container>
      </MainLayout>
    </Fragment>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const api = new API();
  let chapters = [];
  let contentHtml = "";
  try {
    const { chapters: data } = await api.get("menu-punishment");
    const { html } = await api.get("punishment");
    chapters = data;
    contentHtml = html;
  } catch (error) {
    console.log("Error", error);
  }

  return {
    props: {
      chapters,
      contentHtml,
    },
  };
};

export default Page;
