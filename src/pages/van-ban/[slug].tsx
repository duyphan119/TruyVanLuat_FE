import { Fragment } from "react";
import Head from "next/head";
import MainLayout from "@/components/layouts/MainLayout";
import Container from "@/components/common/Container";
import { GetServerSidePropsContext } from "next";
import vanbanApi from "@/api/vanban.api";
import VanBan from "@/types/vanban/VanBan";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { PUBLIC_ROUTES } from "@/utils/constants";

type Props = {
  vanban: VanBan;
};

const Page = ({ vanban }: Props) => {
  const { html, type, title } = vanban;
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <MainLayout>
        <Container>
          <Breadcrumbs
            titleCenter={true}
            current={
              <>
                <div className="text-center font-bold text-lg">{type}</div>
                <div className="text-center text-lg">{title}</div>
              </>
            }
            items={[
              {
                href: PUBLIC_ROUTES.HOME,
                label: "Trang chủ",
              },
              {
                href: PUBLIC_ROUTES.VANBAN,
                label: "Văn bản",
                hideSeperateAfter: true,
              },
            ]}
          />

          <div className="flex gap-4 my-4 items-stretch">
            <div className="right flex-[3] p-2 border border-gray-300 rounded-sm">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: html }}
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
  const slug = context.query.slug;
  try {
    const data = await vanbanApi.getBySlug(`${slug}`);
    return {
      props: {
        vanban: data,
      },
    };
  } catch (error) {}
  return {
    notFound: true,
  };
};

export default Page;
