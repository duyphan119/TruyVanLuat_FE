import newsApi from "@/api/news.api";
import AuthNotFound from "@/components/auth/AuthNotFound";
import Container from "@/components/common/Container";
import MainLayout from "@/components/layouts/MainLayout";
import News from "@/types/news/News";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

type Props = {
  news: News;
};

const Page = ({ news }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>{news.title}</title>
      </Head>
      <AuthNotFound>
        <MainLayout>
          <Container className="py-4">
            <article>
              <h1 className="font-bold text-3xl">{news.title}</h1>
              <div className="text-gray-500 text-sm mt-2">{news.createdAt}</div>
              <p className="mt-2">{news.description}</p>
              <div className="mt-2">
                {news.paragraphs?.map((paragraph, index) => {
                  const isLast = index + 1 === news.paragraphs?.length;
                  return paragraph.type === "image" ? (
                    <div key={paragraph.index}>
                      <div className="relative h-0 pb-[55%] mt-2">
                        <Image
                          src={paragraph.src}
                          alt=""
                          priority={true}
                          fill={true}
                          sizes="(max-width: 1200px) 100vw"
                        />
                      </div>
                      <p className="mt-2">{paragraph.description}</p>
                    </div>
                  ) : (
                    <p
                      key={paragraph.index}
                      className={`mt-4${
                        isLast ? " text-right font-bold text-lg" : ""
                      } `}
                    >
                      {paragraph.text}
                    </p>
                  );
                })}
              </div>
            </article>
          </Container>
        </MainLayout>
      </AuthNotFound>
    </Fragment>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context.query.slug;
  try {
    const data = await newsApi.getBySlug(`${slug}`);
    return {
      props: {
        news: data,
      },
    };
  } catch (error) {}
  return {
    notFound: true,
  };
};

export default Page;
