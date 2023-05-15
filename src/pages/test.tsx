import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Flex from "@/components/common/Flex";
import Input from "@/components/common/Input";
import MainLayout from "@/components/layouts/MainLayout";
import API from "@/config/api";
import Head from "next/head";
import React, { Fragment, useState } from "react";
import duongCams from "@/jsons/duong_cam.json";
import Violation from "@/types/violation/Violation";

type Props = {};

const intents = [
  {
    label: "vi_pham_dai_phan_cach",
    description: "Vi phạm dải phân cách",
  },
  {
    label: "vi_pham_khu_vuc_cam",
    description: "Vi phạm khu vực cấm",
  },
  {
    label: "vi_pham_di_nguoc_chieu",
    description: "Vi phạm đi ngược chiều",
  },
  {
    label: "vi_pham_di_sai_duong",
    description: "Vi phạm đi sai đường",
  },
];

const samples = [
  {
    text: "Điều khiển xe đi qua dải phân cách cố định thì sao",
    intents: ["vi_pham_dai_phan_cach"],
  },
  {
    text: "Đi vào khu vực cấm thì bị gì",
    intents: ["vi_pham_khu_vuc_cam"],
  },
  {
    text: "Đi ngược chiều trên đường cao tốc thì bị gì",
    intents: ["vi_pham_di_nguoc_chieu", "vi_pham_duong_cao_toc"],
  },
  {
    text: "Đi ngược chiều của đường một chiều thì bị gì",
    intents: ["vi_pham_di_nguoc_chieu", "vi_pham_duong_mot_chieu"],
  },
  {
    text: "Đi ngược chiều thì bị gì",
    intents: ["vi_pham_di_nguoc_chieu"],
  },
  {
    text: "Không đi bên phải theo chiều đi của mình thì bị gì",
    intents: ["vi_pham_di_nguoc_chieu"],
  },
  {
    text: "Không đi đúng phần đường của mình thì bị gì",
    intents: ["vi_pham_di_sai_duong"],
  },
];

const Page = (props: Props) => {
  const [trainSuccess, setTrainSuccess] = useState(false);
  const [trainLoading, setTrainLoading] = useState(false);

  const [predictSuccess, setPredictSuccess] = useState(false);
  const [predictLoading, setPredictLoading] = useState(false);

  const [intentSuccess, setIntentSuccess] = useState(false);
  const [intentLoading, setIntentLoading] = useState(false);

  const [sampleSuccess, setSampleSuccess] = useState(false);
  const [sampleLoading, setSampleLoading] = useState(false);

  const handleTrain = () => {
    setTrainSuccess(true);
    setTrainLoading(true);
  };

  const handlePredict = () => {
    setPredictLoading(true);

    const api = new API();
    api
      .post("predict", { content: "Đi ngược chiều trên cao tốc thì bị gì" })
      .then((data) => {
        console.log("Predict Data::", data);
        setPredictSuccess(true);
      })
      .catch((error) => {
        console.log("Predict error::", error);
        setPredictSuccess(false);
      })
      .finally(() => {
        setPredictLoading(false);
      });
  };

  const handleIntent = () => {
    setIntentLoading(true);

    const api = new API();
    Promise.all(intents.map((intent) => api.post("intent", intent)))
      .then((data) => {
        console.log("Intents data::", data);
        setIntentSuccess(true);
      })
      .catch((error) => {
        console.log("Intents error::", error);
        setIntentSuccess(false);
      })
      .finally(() => {
        setIntentLoading(false);
      });
  };

  const handleSample = () => {
    setIntentLoading(true);

    const api = new API();
    Promise.all(
      samples.map((sample) => api.post("sample", { content: sample.text }))
    )
      .then((data) => {
        console.log("Samples data::", data);
        setSampleSuccess(true);
      })
      .catch((error) => {
        console.log("Samples error::", error);
        setSampleSuccess(false);
      })
      .finally(() => {
        setSampleLoading(false);
      });
  };

  return (
    <Fragment>
      <Head>
        <title>Test</title>
      </Head>
      <MainLayout>
        <Container>
          <Flex>
            <div className="p-3 border border-black">
              <div className="my-4">Test Train</div>
              <Button onClick={() => handleTrain()}>
                {trainLoading ? "Đang train..." : "Train"}
              </Button>

              <div className="mt-4">
                <div className="">Kết quả</div>
                <div className="">{trainSuccess ? "Train Success" : ""}</div>
              </div>
            </div>
            <div className="p-3 border border-black">
              <div className="my-4">Test Predict</div>
              <Button onClick={() => handlePredict()}>
                {predictLoading ? "Đang predict..." : "Predict"}
              </Button>

              <div className="mt-4">
                <div className="">Kết quả</div>
                <div className="">
                  {predictSuccess ? "Predict Success" : ""}
                </div>
              </div>
            </div>
            <div className="p-3 border border-black">
              <div className="my-4">Test Intent</div>
              <Button onClick={() => handleIntent()}>
                {intentLoading ? "Đang intent..." : "Intent"}
              </Button>

              <div className="mt-4">
                <div className="">Kết quả</div>
                <div className="">{intentSuccess ? "Intent Success" : ""}</div>
              </div>
            </div>
            <div className="p-3 border border-black">
              <div className="my-4">Test Sample</div>
              <Button onClick={() => handleSample()}>
                {sampleLoading ? "Đang sample..." : "Sample"}
              </Button>

              <div className="mt-4">
                <div className="">Kết quả</div>
                <div className="">{sampleSuccess ? "Sample Success" : ""}</div>
              </div>
            </div>
          </Flex>
          <ul className="mt-4 list-disc">
            {duongCams.map((item) => {
              return <li key={item.id}>{item.content}</li>;
            })}
          </ul>
        </Container>
      </MainLayout>
    </Fragment>
  );
};

export default Page;
