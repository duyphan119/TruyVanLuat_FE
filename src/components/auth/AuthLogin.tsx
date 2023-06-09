import authApi from "@/api/auth.api";
import useUserStore from "@/zustand/userStore";
import { useEffect, ReactNode } from "react";
import NotFound from "../common/NotFound";

type Props = {
  children: ReactNode;
  requireLogin?: boolean;
  requireNoLogin?: boolean;
};

const AuthLogin = ({ children, requireLogin, requireNoLogin }: Props) => {
  const { getProfile, isFetchedProfile, profile } = useUserStore();

  useEffect(() => {
    getProfile();
  }, []);
  if (!isFetchedProfile) return <></>;
  if (requireLogin && isFetchedProfile && !profile)
    return (
      <>
        <NotFound />
      </>
    );
  if (requireNoLogin && isFetchedProfile && profile)
    return (
      <>
        <NotFound />
      </>
    );
  return <>{children}</>;
};

export default AuthLogin;
