import Infringe from "@/types/infringe/Infringe";
import Link from "next/link";
import { forwardRef, ForwardedRef, Fragment } from "react";
import Flex from "./common/Flex";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  infringe: Infringe;
  onClose: () => void;
};

const InfringeModal = forwardRef(
  ({ infringe, onClose }: Props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <Fragment>
        <div className="overlay"></div>
        <div
          ref={ref}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-500 rounded-lg shadow-2xl "
        >
          <div className="flex items-center p-4">
            <div className="flex-1">Thông tin vi phạm</div>
            <button title="Đóng" type="button" onClick={onClose}>
              <AiOutlineClose />
            </button>
          </div>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <div className="p-4 min-w-[50vw] max-w-[80vw] overflow-x-hidden overflow-y-auto max-h-[90vh]">
            <div className="">{infringe.apply_for_detail}</div>
            <div className="mt-2 font-bold">{infringe.content}</div>
            <div className="mt-2 text-red-500">{infringe.punishment}</div>
            <Flex className="flex-col text-[12px] mt-1 !items-start !gap-0">
              {infringe.detail?.split(" và ").map((text, index) => {
                return (
                  <Flex className="!gap-1" key={index}>
                    <span className="">Xem chi tiết:</span>
                    <Link
                      href={`/xu-phat`}
                      className=" underline text-blue-500 hover:text-blue-600"
                    >
                      {text}
                    </Link>
                  </Flex>
                );
              })}
            </Flex>
            {infringe.updated_punishment_detail ? (
              <Flex className="flex-col text-[12px] !items-start !gap-0">
                {infringe.updated_punishment_detail
                  .split(" và ")
                  .map((text, index) => {
                    return (
                      <Flex className="!gap-1" key={index}>
                        <span className="text-red-500">Sửa đổi bởi:</span>
                        <Link
                          href={`/xu-phat`}
                          className=" underline text-blue-500 hover:text-blue-600"
                        >
                          {text}
                        </Link>
                      </Flex>
                    );
                  })}
              </Flex>
            ) : null}
            {infringe.added_punishment ? (
              <Fragment>
                <div className="h-[1px] w-full bg-gray-500 my-2"></div>
                <div className="text-sm">
                  <div className="font-bold">Hình thức phạt bổ sung</div>
                  {infringe.added_punishment
                    ?.split(" ; ")
                    .map((text, index) => (
                      <p className="" key={index}>
                        {text}
                      </p>
                    ))}
                  {infringe.added_punishment_detail !== ""
                    ? infringe.added_punishment_detail
                        ?.split(" và ")
                        .map((text, index) => (
                          <Flex className="text-[12px] !gap-1">
                            <span>Xem chi tiết:</span>
                            <Link
                              key={index}
                              href={`/xu-phat`}
                              className="underline text-blue-500 block"
                            >
                              {text}
                            </Link>
                          </Flex>
                        ))
                    : null}
                  {infringe.updated_added_punishment_detail !== ""
                    ? infringe.updated_added_punishment_detail
                        ?.split(" và ")
                        .map((text, index) => (
                          <Flex className="text-[12px] !gap-1">
                            <span className="text-red-500">Sửa đổi bởi:</span>
                            <Link
                              key={index}
                              href={`/xu-phat`}
                              className="underline text-blue-500 block"
                            >
                              {text}
                            </Link>
                          </Flex>
                        ))
                    : null}
                </div>
              </Fragment>
            ) : null}
            {infringe.solution ? (
              <Fragment>
                <div className="h-[1px] w-full bg-gray-500 my-2"></div>
                <div className="text-sm">
                  <div className="font-bold">Biện pháp khắc phục</div>
                  {infringe.solution?.split(" ; ").map((text, index) => (
                    <p className="" key={index}>
                      {text}
                    </p>
                  ))}
                  {infringe.solution_detail !== ""
                    ? infringe.solution_detail
                        ?.split(" và ")
                        .map((text, index) => (
                          <Flex className="text-[12px] !gap-1">
                            <span>Xem chi tiết:</span>
                            <Link
                              key={index}
                              href={`/xu-phat`}
                              className="underline text-blue-500 block"
                            >
                              {text}
                            </Link>
                          </Flex>
                        ))
                    : null}
                  {infringe.updated_solution_detail !== ""
                    ? infringe.updated_solution_detail
                        ?.split(" và ")
                        .map((text, index) => (
                          <Flex className="text-[12px] !gap-1">
                            <span className="text-red-500">Sửa đổi bởi:</span>
                            <Link
                              key={index}
                              href={`/xu-phat`}
                              className="underline text-blue-500 block"
                            >
                              {text}
                            </Link>
                          </Flex>
                        ))
                    : null}
                </div>
              </Fragment>
            ) : null}
            {infringe.note ? (
              <Fragment>
                <div className="h-[1px] w-full bg-gray-500 my-2"></div>
                <div className="text-sm">
                  <div className="font-bold">Ghi chú</div>
                  <p className="">{infringe.note}</p>
                  {infringe.note_detail !== ""
                    ? infringe.note_detail?.split(" và ").map((text, index) => (
                        <Flex className="text-[12px] !gap-1">
                          <span>Xem chi tiết:</span>
                          <Link
                            key={index}
                            href={`/xu-phat`}
                            className="underline text-blue-500 block"
                          >
                            {text}
                          </Link>
                        </Flex>
                      ))
                    : null}
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </Fragment>
    );
  }
);

export default InfringeModal;
