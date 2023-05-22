import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import NextNProgress from "nextjs-progressbar";
import ScrollToTop from "@/components/ScrollToTop";

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
      <Component {...pageProps} />
    </Fragment>
  );
}
