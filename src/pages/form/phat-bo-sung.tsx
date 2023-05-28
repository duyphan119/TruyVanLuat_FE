import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Input from "@/components/common/Input";
import MainLayout from "@/components/layouts/MainLayout";
import axios from "axios";
import Head from "next/head";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const [id, setid] = React.useState<string>("");
  const [content, setcontent] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = { id, content };

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

    try {
      const res = await axios.post(
        "http://localhost:5000/addition_punishments",
        formData
      );
      console.log("res::: ", res);
    } catch (error) {}

    console.log(formData.id, " Submit");
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
                label="Mã phạt bổ sung"
                direction="vertical"
                value={id}
                onChange={(e) => setid(e.target.value)}
              />
              <Input
                label="Nội dung phạt bổ sung"
                direction="vertical"
                value={content}
                onChange={(e) => setcontent(e.target.value)}
              />
              <Button type="submit">Submit</Button>
            </Flex>
          </form>
        </Container>
      </MainLayout>
    </React.Fragment>
  );
};

export default Page;
