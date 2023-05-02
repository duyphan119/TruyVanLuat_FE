import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import useComponentVisible from "@/hooks/useComponentVisible";
import useQueryString from "@/hooks/useQueryString";
import helpers from "@/utils/helpers";
import useEmployeeStore from "@/zustand/useEmployeeStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type Props = {};

const CRUD = (props: Props) => {
  const router = useRouter();
  const { getNumber } = useQueryString();
  const p = getNumber("p", 1);
  const limit = getNumber("limit", 12);

  const { get, rows, totalPage } = useEmployeeStore();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      setIsComponentVisible(false);
      router.push(`/crud?p=${inputRef.current.value}`);
    }
  };

  const handleClickPrev = () => {
    setIsComponentVisible(false);
    router.push(p - 1 > 1 ? `/crud?p=${p - 1}` : `/crud`);
  };

  const handleClickNext = () => {
    setIsComponentVisible(false);
    router.push(p + 1 <= totalPage ? `/crud?p=${p + 1}` : `/crud?p=${p}`);
  };

  useEffect(() => {
    const params: { p?: number; limit?: number } = {};

    if (p > 0) params.p = p;
    if (limit > 1) params.limit = limit;

    get(params);
  }, [get, p, limit]);

  useEffect(() => {
    setOpen(isComponentVisible);
  }, [isComponentVisible]);

  return (
    <Container>
      <div className="flex flex-col items-center gap-4 py-5">
        <h1 className="text-3xl text-center">CRUD</h1>
        <div className="flex items-center justify-between w-full">
          <Button>Thêm mới</Button>
          <div className="flex items-center gap-2 relative">
            <span
              className="cursor-pointer hover:text-indigo-500"
              onClick={handleClickPrev}
            >
              <AiOutlineLeft />
            </span>
            <span
              className="hover:bg-neutral-100 cursor-pointer px-2 py-1"
              onClick={() => {
                setIsComponentVisible((prevState) => !prevState);
              }}
            >
              Trang {p} / {totalPage}
            </span>
            <span
              className="cursor-pointer hover:text-indigo-500"
              onClick={handleClickNext}
            >
              <AiOutlineRight />
            </span>
            {open && isComponentVisible ? (
              <form
                ref={ref}
                className="absolute top-full left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 border border-gray-400 bg-neutral-100 rounded-sm"
                onSubmit={handleSubmit}
              >
                <span className="whitespace-nowrap text-sm">Đi tới trang</span>
                <input
                  className="w-12 border border-black outline-none"
                  type="number"
                  ref={inputRef}
                  max={totalPage}
                  min={1}
                  defaultValue={1}
                />
              </form>
            ) : null}
          </div>
        </div>
        <table className="w-full">
          <thead className="">
            <tr className="">
              <th className="p-2 text-center w-14 border border-neutral-400">
                ID
              </th>
              <th className="p-2 border border-neutral-400">Name</th>
              <th className="p-2 border border-neutral-400">Email</th>
              <th className="p-2 border border-neutral-400 text-center">
                Birthday
              </th>
              <th className="p-2 border border-neutral-400 text-center">
                CreatedAt
              </th>
              <th className="p-2 border border-neutral-400 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {rows.map((row) => {
              return (
                <tr className="" key={row.id}>
                  <td className="p-2 text-center border border-neutral-400">
                    {row.id}
                  </td>
                  <td className="p-2 border border-neutral-400">
                    <div className="flex items-center gap-3">
                      <Image
                        alt="avatar"
                        src={row.avatar}
                        width={56}
                        height={56}
                        priority={true}
                      />
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td className="p-2 border border-neutral-400">{row.email}</td>
                  <td className="p-2 border border-neutral-400 text-center">
                    {helpers.formatDate(row.birthday)}
                  </td>
                  <td className="p-2 border border-neutral-400 text-center">
                    {helpers.formatDateTime(row.createdAt)}
                  </td>
                  <td className="p-2 border border-neutral-400">
                    <div className="flex items-center justify-center gap-2">
                      <Button>Sửa</Button>
                      <Button color="error">Xoá</Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default CRUD;
