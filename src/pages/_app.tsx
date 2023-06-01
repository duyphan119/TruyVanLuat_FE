import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import NextNProgress from "nextjs-progressbar";
import ScrollToTop from "@/components/ScrollToTop";
import { Open_Sans } from "next/font/google";
const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["italic", "normal"],
  subsets: ["vietnamese"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Website hỗ trợ truy vấn luật giao thông đường bộ</title>
      </Head>
      <NextNProgress
        color="rgb(99, 102, 241, 0.5)"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <ScrollToTop />
      <div className={openSans.className}>
        <Component {...pageProps} />
      </div>
    </Fragment>
  );
}
