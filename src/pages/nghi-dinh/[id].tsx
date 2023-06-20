import Container from "@/components/common/Container";
import DrawerMenu from "@/components/DrawerMenu";
import MainLayout from "@/components/layouts/MainLayout";
import Menu from "@/components/Menu";
import API from "@/config/api";
import VanBan from "@/types/vanban/VanBan";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Fragment } from "react";

type Props = {
  vanBan: VanBan;
};

const Page = ({ vanBan }: Props) => {
  const { dieus, html, title, type } = vanBan;
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <MainLayout>
        <Container className="py-4">
          <div className="text-center font-bold text-lg">{type}</div>
          <div className="text-center text-lg">{title}</div>
          {/* <DrawerMenu dieus={dieus || []} /> */}
          <div className="flex gap-4 my-4 items-stretch">
            <Menu dieus={dieus || []} />
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
  const api = new API();
  let { id: idParams } = context.query;
  const id = idParams ? `${idParams}` : 100;
  try {
    const vanBan = await api.get("vanban/" + id);
    return {
      props: {
        vanBan,
      },
    };
  } catch (error) {
    console.log("Error", error);
  }
  return {
    notFound: true,
  };
};

export default Page;
