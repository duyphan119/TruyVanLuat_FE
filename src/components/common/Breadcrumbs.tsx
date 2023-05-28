import { PUBLIC_ROUTES } from "@/utils/constants";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

type Props = {
  titleCenter?: boolean;
  items: Array<{
    label: string;
    href: string;
    hideSeperateAfter?: boolean;
  }>;
  current: ReactNode;
  className?: string;
};

const Breadcrumbs = ({
  titleCenter,
  items,
  current,
  className = "",
}: Props) => {
  return (
    <nav className={`w-full my-4 ${className}`}>
      <ol
        className={`list-reset flex flex-wrap items-center${
          titleCenter ? " justify-center" : ""
        }`}
      >
        {items.map((item, index) => {
          return (
            <Fragment key={item.href}>
              <li>
                <Link
                  href={item.href}
                  className="text-neutral-500 hover:text-[var(--mainColor)]"
                >
                  {item.label}
                </Link>
              </li>
              {item.hideSeperateAfter ? null : (
                <li>
                  <span className="mx-2 text-neutral-500 dark:text-neutral-400">
                    /
                  </span>
                </li>
              )}
            </Fragment>
          );
        })}

        <li
          className={`dark:text-neutral-400 text-2xl font-medium${
            titleCenter ? " w-full text-center" : ""
          }`}
        >
          {current}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
