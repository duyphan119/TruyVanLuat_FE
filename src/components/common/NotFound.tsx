import styles from "@/components/styles/NotFound.module.css";
import { PUBLIC_ROUTES } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

const NotFound = (props: Props) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["noise"]}></div>
      <div className={styles["overlay"]}></div>
      <div className={styles["terminal"]}>
        <h1>
          Lỗi <span className={styles["errorcode"]}>404</span>
        </h1>
        <p className={styles["output"]}>
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <p className={styles["output"]}>
          Vui lòng thử{" "}
          <span
            className={`${styles["a"]} cursor-pointer`}
            onClick={handleBack}
          >
            quay lại
          </span>{" "}
          hoặc{" "}
          <Link href={PUBLIC_ROUTES.HOME} className={styles["a"]}>
            Trở lại trang chủ
          </Link>
          .
        </p>
        <p className={styles["output"]}>Chúc may mắn.</p>
      </div>
    </div>
  );
};

export default NotFound;
