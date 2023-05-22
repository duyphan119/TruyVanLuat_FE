import useComponentVisible from "@/hooks/useComponentVisible";
import Dieu from "@/types/dieu/Dieu";
import { Fragment } from "react";
import { BiMenu } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import Flex from "./common/Flex";
import MenuItem from "./MenuItem";

type Props = {
  dieus: Dieu[];
};

const DrawerMenu = ({ dieus }: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  return (
    <Fragment>
      <label
        className="cursor-pointer inline-flex items-center xl:hidden"
        htmlFor="menu-drawer"
      >
        <BiMenu fontSize={20} />
      </label>
      <input
        type="checkbox"
        id="menu-drawer"
        hidden
        className="[&:checked+.menu-drawer]:translate-x-0"
        checked={isComponentVisible}
        onChange={(e) => setIsComponentVisible(e.target.checked)}
      />
      <div
        className="menu-drawer left flex-[1] border border-gray-300 rounded-sm md:hidden fixed top-0 bottom-0 left-0 max-w-[80vw] bg-white -translate-x-full transition"
        ref={ref}
      >
        <Flex className="p-2 bg-indigo-300 justify-between">
          <span>MỤC LỤC</span>
          <label htmlFor="menu-drawer" className="cursor-pointer">
            <GrClose />
          </label>
        </Flex>
        <ul className="py-2 flex flex-col gap-2">
          {dieus.map((dieu, index) => {
            return <MenuItem key={index} dieu={dieu} />;
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default DrawerMenu;
