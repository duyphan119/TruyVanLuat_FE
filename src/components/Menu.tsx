import Dieu from "@/types/dieu/Dieu";
import React from "react";
import Flex from "./common/Flex";
import MenuItem from "./MenuItem";

type Props = {
  dieus: Dieu[];
};

const Menu = ({ dieus }: Props) => {
  return (
    <div className="left flex-[1] border border-gray-300 rounded-sm xl:block hidden">
      <Flex className="p-2 bg-indigo-300 justify-between">
        <span>MỤC LỤC</span>
      </Flex>
      <ul className="py-2 flex flex-col gap-2">
        {dieus.map((dieu, index) => {
          return <MenuItem key={index} dieu={dieu} />;
        })}
      </ul>
    </div>
  );
};

export default Menu;
