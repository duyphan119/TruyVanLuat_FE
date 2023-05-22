import newsApi from "@/api/news.api";
import News from "@/types/news/News";
import { HOME_PAGE, PUBLIC_ROUTES } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import Button from "./common/Button";

type Props = {};

const SectionHomeNews = (props: Props) => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    newsApi
      .getAll(HOME_PAGE.LIMIT_NEWS)
      .then((data) => {
        if (isMounted) {
          setNewsList(data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setIsFetched(true);
      });
    return () => {
      isMounted = false;
    };
  }, []);
  if (isFetched && newsList.length === 0) return <Fragment></Fragment>;
  return (
    <section className="">
      <h1 className="text-3xl font-semibold text-center my-4 uppercase">
        Tin tức
      </h1>
      <div className="grid grid-cols-4 gap-3 min-h-[302.15px]">
        {new Array(HOME_PAGE.LIMIT_NEWS).fill("").map((_, index) => {
          let item = null;
          if (newsList[index]) item = newsList[index];

          const Content = ({ item }: any) => {
            return (
              <>
                <div
                  className={`relative w-full pb-[65%]${
                    item ? "" : " bg-gray-300"
                  }`}
                >
                  {item ? (
                    <Image
                      alt="thumbnail"
                      src={"" + item.thumbnail}
                      fill={true}
                      priority={true}
                    />
                  ) : null}
                </div>
                <div
                  className="hover:text-indigo-500"
                  title={item ? item.title : ""}
                >
                  <p
                    className={`three-dot three-dot-2 font-semibold h-[52px] mt-1${
                      item ? "" : " bg-gray-300 text-gray-300 rounded-md"
                    }`}
                  >
                    {item
                      ? item.title
                      : `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                cupiditate facere placeat voluptatem amet quo quae ipsum
                molestiae minima fugit eveniet sint quisquam id, quas ab, veniam
                inventore? Repellendus, repudiandae.`}
                  </p>
                </div>
                <div
                  className="text-gray-400 text-sm"
                  title={item ? item.title : ""}
                >
                  <p
                    className={`three-dot three-dot-2 font-semibold mt-1${
                      item ? "" : " bg-gray-300 text-gray-300 rounded-md"
                    }`}
                  >
                    {item
                      ? item.description
                      : `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                cupiditate facere placeat voluptatem amet quo quae ipsum
                molestiae minima fugit eveniet sint quisquam id, quas ab, veniam
                inventore? Repellendus, repudiandae.`}
                  </p>
                </div>
              </>
            );
          };

          return (
            <article className="news" key={index}>
              {item ? (
                <>
                  <Link
                    href={`${PUBLIC_ROUTES.NEWS}/${item.slug}`}
                    className="block"
                    title={item.title}
                  >
                    <Content item={item} />
                  </Link>
                </>
              ) : (
                <div>
                  <Content />
                </div>
              )}
            </article>
          );
        })}
      </div>
      <div className="text-center mt-4">
        <Button href={PUBLIC_ROUTES.NEWS} title="Xem tất cả tin tức">
          Xem thêm
        </Button>
      </div>
    </section>
  );
};

export default SectionHomeNews;
