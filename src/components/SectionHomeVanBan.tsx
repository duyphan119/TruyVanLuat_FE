import vanbanApi from "@/api/vanban.api";
import VanBanCrawled from "@/types/vanban/VanBanCrawled";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  HOME_PAGE,
  PUBLIC_ROUTES,
} from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./common/Button";
import Container from "./common/Container";

type Props = {};

const SectionHomeVanBan = (props: Props) => {
  const [vanbans, setVanBans] = useState<VanBanCrawled[]>([]);

  useEffect(() => {
    let isMounted = true;
    vanbanApi
      .getAll(DEFAULT_PAGE, HOME_PAGE.LIMIT_VANBAN)
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
    <section className="py-10">
      <Container>
        <h2 className="text-[50px] text-center px-3 mb-10 font-thin">
          Văn bản luật
        </h2>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:min-h-[432px] min-h-[880px]">
          {new Array(HOME_PAGE.LIMIT_VANBAN).fill("").map((_, index) => {
            let item = null;
            if (vanbans[index]) item = vanbans[index];
            return (
              <Link
                href={item ? `${PUBLIC_ROUTES.VANBAN}/${item.slug}` : "/"}
                className="cursor-pointer"
                title={item ? item.title : ""}
                key={index}
              >
                <p
                  className={`${
                    item
                      ? "hover:text-[var(--mainColor)]"
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
                  Ban hành: {item ? item.issue : "01/01/2000"}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-10 h-[41.6px]">
          {vanbans.length > 0 ? (
            <Button href={PUBLIC_ROUTES.VANBAN} title="Xem tất cả văn bản">
              Xem thêm
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
};

export default SectionHomeVanBan;
