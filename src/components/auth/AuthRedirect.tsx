import { PROTECTED_ROUTES } from "@/utils/constants";
import useUserStore from "@/zustand/userStore";
import { useRouter } from "next/router";
import React from "react";
import Loading from "../common/Loading";

type Props = {
  children: React.ReactNode;
};

const AuthRedirect = ({ children }: Props) => {
  const router = useRouter();
  const { getProfile, isFetchedProfile, profile } = useUserStore();

  React.useEffect(() => {
    getProfile();
  }, []);

  React.useEffect(() => {
    if (isFetchedProfile && !(profile && profile.is_admin)) {
      router.push(PROTECTED_ROUTES.LOGIN);
    } else if (
      isFetchedProfile &&
      profile &&
      profile.is_admin &&
      router.pathname === PROTECTED_ROUTES.LOGIN
    ) {
      router.push(PROTECTED_ROUTES.DASHBOARD);
    }
  }, [isFetchedProfile, profile]);

  //   if(isFetchedProfile && profile) {

  //   }
  if (isFetchedProfile && profile && profile.is_admin) return <>{children}</>;
  if (
    isFetchedProfile &&
    !(profile && profile.is_admin) &&
    router.pathname === PROTECTED_ROUTES.LOGIN
  )
    return <>{children}</>;
  return <></>;
};

export default AuthRedirect;
