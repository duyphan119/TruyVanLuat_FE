import authApi from "@/api/auth.api";
import useUserStore from "@/zustand/userStore";
import { useEffect, ReactNode } from "react";
import NotFound from "../common/NotFound";

type Props = {
  children: ReactNode;
  requireLogin?: boolean;
  requireNoLogin?: boolean;
  requireNoLoginAdmin?: boolean;
};

const AuthNotFound = ({
  children,
  requireLogin,
  requireNoLogin,
  requireNoLoginAdmin,
}: Props) => {
  const { getProfile, isFetchedProfile, profile } = useUserStore();

  useEffect(() => {
    getProfile();
  }, []);
  if (!isFetchedProfile) return <></>;
  // if (requireLogin && isFetchedProfile && !profile)
  //   return (
  //     <>
  //       <NotFound />
  //     </>
  //   );
  // if (requireNoLogin && isFetchedProfile && profile)
  //   return (
  //     <>
  //       <NotFound />
  //     </>
  //   );
  // if (requireNoLoginAdmin && isFetchedProfile && profile && profile.is_admin)
  //   return (
  //     <>
  //       <NotFound />
  //     </>
  //   );
  return <>{children}</>;
};

export default AuthNotFound;
