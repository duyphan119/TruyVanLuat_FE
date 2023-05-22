import Dieu from "@/types/dieu/Dieu";
import React from "react";

type Props = {
  dieu: Dieu;
};

const MenuItem = ({ dieu }: Props) => {
  return (
    <li className="px-2">
      <a
        href={`#${dieu.code}`}
        className="hover:text-indigo-500 font-semibold three-dot three-dot-3"
        title={dieu.title}
      >
        {dieu.title}
      </a>
      {dieu.khoans.length > 0 ? (
        <ol className="mt-1 text-sm text-left">
          {dieu.khoans.map((khoan, index) => {
            return (
              <li className="py-2" key={index}>
                <a
                  href={`#${khoan.code}`}
                  className="hover:text-indigo-500 text-justify three-dot three-dot-3"
                  title={khoan.title}
                >
                  {khoan.title}
                </a>
              </li>
            );
          })}
        </ol>
      ) : null}
    </li>
  );
};

export default MenuItem;
