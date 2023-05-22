import vanbanApi from "@/api/vanban.api";
import VanBanCrawled from "@/types/vanban/VanBanCrawled";
import { DEFAULT_LIMIT, DEFAULT_PAGE, PUBLIC_ROUTES } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./common/Button";

type Props = {};

const SectionHomeVanBan = (props: Props) => {
  const [vanbans, setVanBans] = useState<VanBanCrawled[]>([]);

  useEffect(() => {
    let isMounted = true;
    vanbanApi
      .getAll(DEFAULT_PAGE, DEFAULT_LIMIT)
      .then((data) => {
        if (isMounted) {
          setVanBans(data.rows);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <section className="">
      <h1 className="text-3xl font-semibold text-center my-4 uppercase">
        Văn bản
      </h1>
      <div className="grid grid-cols-2 gap-4 min-h-[432px]">
        {new Array(10).fill("").map((_, index) => {
          let item = null;
          if (vanbans[index]) item = vanbans[index];
          return (
            <Link
              href={item ? `${PUBLIC_ROUTES.VANBAN}/${item.slug}` : "/"}
              className="cursor-pointer"
              key={index}
            >
              <p
                className={`${
                  item
                    ? "hover:text-indigo-500"
                    : "bg-gray-300 rounded-md text-gray-300"
                } font-medium three-dot three-dot-2`}
              >
                {item
                  ? item.title
                  : `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                cupiditate facere placeat voluptatem amet quo quae ipsum
                molestiae minima fugit eveniet sint quisquam id, quas ab, veniam
                inventore? Repellendus, repudiandae.`}
              </p>
              <p
                className={`${
                  item
                    ? "text-gray-500"
                    : "bg-gray-200 rounded-md text-gray-200"
                } text-sm mt-1 inline-block`}
              >
                {item ? item.issue : "01/01/2000"}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="text-center mt-4">
        <Button href={PUBLIC_ROUTES.VANBAN} title="Xem tất cả văn bản">
          Xem thêm
        </Button>
      </div>
    </section>
  );
};

export default SectionHomeVanBan;
