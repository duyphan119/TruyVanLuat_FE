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

            <div className="grid grid-cols-12 gap-10 mt-10">
              <div className="left col-span-8 p-2 md:p-0">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: vanban.html }}
                ></div>
              </div>
              <div className="right col-span-4">
                <table className="text-sm">
                  <thead>
                    <tr>
                      <th
                        colSpan={2}
                        className="uppercase p-2 bg-[var(--mainColor)] text-white"
                      >
                        THUỘC TÍNH {vanban.title}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-neutral-200">
                        Loại văn bản
                      </td>
                      <td className="p-2 border border-neutral-200">
                        {vanban.kind}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-neutral-200">Số hiệu</td>
                      <td className="p-2 border border-neutral-200">
                        {vanban.code}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-neutral-200">
                        Cơ quan ban hành
                      </td>
                      <td className="p-2 border border-neutral-200">
                        {vanban.issuingOrganization}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-neutral-200">
                        Người ký
                      </td>
                      <td className="p-2 border border-neutral-200">
                        {vanban.signer}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-neutral-200">
                        Tình trạng hiệu lực
                      </td>
                      <td className="p-2 border border-neutral-200">
                        {vanban.status}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-neutral-200">
                        Cập nhật
                      </td>
                      <td className="p-2 border border-neutral-200">
                        {vanban.updated}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
