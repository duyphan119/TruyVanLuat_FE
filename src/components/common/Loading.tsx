import React from "react";
import styles from "@/components/styles/Loading.module.css";

type Props = {
  fullScreen?: boolean;
};

const Loading = ({ fullScreen }: Props) => {
  if (fullScreen)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className={styles.loadingspinner}>
          <div id={styles.square1}></div>
          <div id={styles.square2}></div>
          <div id={styles.square3}></div>
          <div id={styles.square4}></div>
          <div id={styles.square5}></div>
        </div>
      </div>
    );
  return (
    <div className={`flex items-center justify-center`}>
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};

export default Loading;
