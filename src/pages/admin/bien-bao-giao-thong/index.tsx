import trafficSignApi from "@/api/trafficSign.api";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import Paper from "@/components/common/Paper";
import AdminLayout from "@/components/layouts/AdminLayout";
import useQueryString from "@/hooks/useQueryString";
import PaginationResponse from "@/types/response/PaginationResponse";
import TrafficSign from "@/types/trafficSign/TrafficSign";
import {
  DASHBOARD,
  DEFAULT_LIMIT,
  PAGINATION_RESPONSE_EMPTY,
  PROTECTED_ROUTES,
} from "@/utils/constants";
import { createQueryString } from "@/utils/helpers";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  const { getNumber } = useQueryString();
  const p = getNumber("p", 1);
  const limit = getNumber("limit", DEFAULT_LIMIT);

  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<PaginationResponse<TrafficSign>>(
    PAGINATION_RESPONSE_EMPTY
  );

  React.useEffect(() => {
    let isMounted = true;
    trafficSignApi
      .getAll({ p, limit })
      .then((res) => {
        if (isMounted) {
          setData(res);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [p, limit]);

  return (
    <React.Fragment>
      <Head>
        <title>Danh sách biển báo giao thông</title>
      </Head>
      {loading ? (
        <Loading fullScreen={true} />
      ) : (
        <AdminLayout>
          <Paper
            title="Biển báo giao thông"
            className="overflow-hidden"
            style={{
              maxHeight: `calc(100vh - ${DASHBOARD.HEADER_HEIGHT + 48}px)`,
            }}
          >
            <DataTable
              cols={[
                {
                  label: "Mã số",
                  key: "code",
                  className: "text-center",
                  render: (model: TrafficSign) => (
                    <p className="text-center">{model.code}</p>
                  ),
                },
                {
                  label: "Tên",
                  key: "name",
                  className: "text-left",
                  render: (model: TrafficSign) => (
                    <div className="flex items-center gap-2">
                      <Image
                        src={model.image}
                        alt="Image"
                        width={60}
                        height={60}
                        priority={true}
                      />
                      <span>{model.name}</span>
                    </div>
                  ),
                },
                {
                  label: "Hành động",
                  key: "actions",
                  render: (model: TrafficSign) => (
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`${PROTECTED_ROUTES.TRAFFIC_SIGNS}/sua/${model.id}`}
                        className="text-indigo-500"
                        title="Sửa"
                      >
                        <MdEdit size={20} />
                      </Link>
                      <button className="text-rose-500" title="Xoá">
                        <MdDelete size={20} />
                      </button>
                    </div>
                  ),
                },
              ]}
              rows={data.rows}
              hasColIndex={true}
              newDataButton={{
                link: `${PROTECTED_ROUTES.TRAFFIC_SIGNS}/them`,
              }}
              pagination={{
                count: data.count,
                current: p,
                pageSize: limit,
                onPageChange: (page) => {
                  const qs = createQueryString({
                    ...(page > 1 ? { p: page } : {}),
                  });
                  router.push(`${PROTECTED_ROUTES.TRAFFIC_SIGNS}${qs}`);
                },
              }}
            />
          </Paper>
        </AdminLayout>
      )}
    </React.Fragment>
  );
};

export default Page;
