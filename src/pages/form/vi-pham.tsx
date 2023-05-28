import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Input from "@/components/common/Input";
import MainLayout from "@/components/layouts/MainLayout";
import { violations } from "@/jsons/test";
import axios from "axios";
import Head from "next/head";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const [id, setid] = React.useState<string>("");
  const [content, setcontent] = React.useState<string>("");
  const [violator, setviolator] = React.useState<string>("");
  const [punishment, setpunishment] = React.useState<string>("");
  const [note, setnote] = React.useState<string>("");
  const [group, setgroup] = React.useState<string>("");
  const [text, settext] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = { id, content, violator, punishment, note, group };

    const formData = { ...values, detail: "" };
    const [_, _c1, _c2, _c3] = formData.id.split(`_`);
    let detail = "";
    if (formData.id.startsWith("diem")) {
      detail = `${
        _c3 ? `Điểm ${_c3 === `dd` ? `đ` : _c3} ` : ""
      }Khoản ${_c2} Điều ${_c1} Nghị định 100/2019/NĐ-CP`;
    } else {
      detail = `Khoản ${_c2} Điều ${_c1} Nghị định 100/2019/NĐ-CP`;
    }
    formData.detail = detail;
    if (formData.note !== "") {
      formData.note = `${formData.note[0].toUpperCase()}${formData.note.substring(
        1
      )}`;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/violations",
        formData
      );
      settext(`${formData.id} Submit`);
    } catch (error) {
      settext(`${formData.id} Error`);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Thêm dữ liệu ontology</title>
      </Head>
      <MainLayout>
        <Container>
          <form onSubmit={handleSubmit} className="w-[600px] mx-auto">
            <Flex className="flex-col">
              <Input
                label="Mã vi phạm"
                direction="vertical"
                value={id}
                onChange={(e) => setid(e.target.value)}
              />
              <Input
                label="Vi phạm về"
                direction="vertical"
                value={group}
                onChange={(e) => setgroup(e.target.value)}
              />
              <Input
                label="Nội dung vi phạm"
                direction="vertical"
                value={content}
                onChange={(e) => setcontent(e.target.value)}
              />
              <Input
                label="Đối tượng vi phạm"
                direction="vertical"
                value={violator}
                onChange={(e) => setviolator(e.target.value)}
              />
              <Input
                label="Phạt tiền"
                direction="vertical"
                value={punishment}
                onChange={(e) => setpunishment(e.target.value)}
              />
              <Input
                label="Ghi chú"
                direction="vertical"
                value={note}
                onChange={(e) => setnote(e.target.value)}
              />
              <Button type="submit">Submit</Button>
              <div className="mt-2">{text}</div>
            </Flex>
          </form>
        </Container>
      </MainLayout>
    </React.Fragment>
  );
};

export default Page;
