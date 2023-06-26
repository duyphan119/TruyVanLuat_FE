import { Fragment } from "react";
import Head from "next/head";
import MainLayout from "@/components/layouts/MainLayout";
import Container from "@/components/common/Container";
import { GetServerSidePropsContext } from "next";
import vanbanApi from "@/api/vanban.api";
import VanBan from "@/types/vanban/VanBan";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { PUBLIC_ROUTES } from "@/utils/constants";
import AuthNotFound from "@/components/auth/AuthNotFound";

type Props = {
  vanban: any;
};

const Page = ({ vanban }: Props) => {
  return (
    <Fragment>
      <Head>
        <title>{vanban.title}</title>
      </Head>
      <AuthNotFound>
        <MainLayout>
          <Container className="py-4">
            <Breadcrumbs
              titleCenter={true}
              current={vanban.title}
              items={[
                {
                  href: PUBLIC_ROUTES.HOME,
                  label: "Trang chủ",
                },
                {
                  href: PUBLIC_ROUTES.VANBAN,
                  label: "Văn bản",
                  hideSeparateAfter: true,
                },
              ]}
            />

            <div className="p-2 md:p-0">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: vanban.html }}
              ></div>
            </div>
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
  const cat = context.query.cat;
  try {
    const data = await vanbanApi.getBySlug(`${cat}`, `${slug}`);
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
