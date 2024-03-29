import newsApi from "@/api/news.api";
import News from "@/types/news/News";
import {
  HOME_PAGE,
  PLACEHOLDER_THUMBNAIL,
  PUBLIC_ROUTES,
} from "@/utils/constants";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import Button from "./common/Button";
import Container from "./common/Container";

type NewsItem = {
  title: string;
  description: string;
  link: string;
  published: number;
  created: number;
  category: string;
  enclosures: {
    url: string;
    width: string;
    height: string;
  }[];
  media: {
    thumbnail: {
      url: string;
      width: string;
      height: string;
    };
  };
};

type NewsData = {
  title: string;
  description: string;
  link: string;
  image: string;
  category: any[];
  items: {
    title: string;
    description: string;
    link: string;
    published: number;
    created: number;
    category: string;
    enclosures: {
      url: string;
      width: string;
      height: string;
    }[];
    media: {
      thumbnail: {
        url: string;
        width: string;
        height: string;
      };
    };
  }[];
};

type Props = {
  newsData: string;
};

const SectionHomeNews = ({ newsData }: Props) => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const data: NewsData = JSON.parse(newsData);

  console.log(JSON.parse(newsData));

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    newsApi
      .getAll({ limit: HOME_PAGE.LIMIT_NEWS })
      .then((data) => {
        if (isMounted) {
          setNewsList(data.rows);
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
    <section className="py-10">
      <Container>
        <h2 className="text-[50px] text-center px-3 mb-10 font-thin">
          Tin tức giao thông
        </h2>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-3 lg:min-h-[302.15px] min-h-[620.2px]">
          {new Array(HOME_PAGE.LIMIT_NEWS).fill("").map((_, index) => {
            let item = null;
            if (data.items[index]) item = data.items[index];

            const Content = ({ item }: { item: NewsItem | null }) => {
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
                        src={item.media.thumbnail.url || PLACEHOLDER_THUMBNAIL}
                        fill={true}
                        priority={true}
                        sizes={"(max-width: 400px) 100vw"}
                      />
                    ) : null}
                  </div>
                  <div
                    className="hover:text-[var(--mainColor)]"
                    title={item ? item.title : ""}
                  >
                    <p
                      className={`three-dot three-dot-2 font-semibold h-[52px] mt-1${
                        item
                          ? " group-hover:text-[var(--mainColor)]"
                          : " bg-gray-300 text-gray-300 rounded-md"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: item
                          ? item.title
                          : `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                cupiditate facere placeat voluptatem amet quo quae ipsum
                molestiae minima fugit eveniet sint quisquam id, quas ab, veniam
                inventore? Repellendus, repudiandae.`,
                      }}
                    ></p>
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
                        ? moment(item.published).format("DD/MM/YYYY HH:mm")
                        : moment(new Date()).format()}
                    </p>
                  </div>
                  {/* <div
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
                  </div> */}
                </>
              );
            };

            let link = "";

            if (item) {
              const splitLink = item.link.split("/");
              link = splitLink[splitLink.length - 1];
            }

            return (
              <article className="news" key={index}>
                {item ? (
                  <>
                    <Link
                      href={`${PUBLIC_ROUTES.NEWS}/${link}`}
                      className="block group"
                      title={item.title}
                    >
                      <Content item={item} />
                    </Link>
                  </>
                ) : (
                  <div>
                    <Content item={null} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Button
            href={PUBLIC_ROUTES.NEWS}
            title="Xem tất cả tin tức"
            newCss={true}
          >
            Xem thêm
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default SectionHomeNews;
