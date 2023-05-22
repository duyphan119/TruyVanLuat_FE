import { useEffect, useState } from "react";
import Button from "./common/Button";
import { BsArrowUp } from "react-icons/bs";
type Props = {};

const ScrollToTop = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const scroll = (e: Event) => {
      setVisible(window.scrollY > 0);
    };
    document.addEventListener("scroll", scroll);

    return () => document.removeEventListener("scroll", scroll);
  }, []);

  const handleClick = () => {
    window.scroll({
      behavior: "smooth",
      top: 0,
    });
  };

  return visible ? (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <Button
        type="button"
        onClick={handleClick}
        title="Lên đầu trang"
        className="text-3xl !p-2 hover:shadow"
      >
        <BsArrowUp />
      </Button>
    </div>
  ) : null;
};

export default ScrollToTop;
