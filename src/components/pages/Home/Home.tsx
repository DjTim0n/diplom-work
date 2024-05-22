"use client";

import { useAppSelector } from "@/service/redux/store";
import { useRouter } from "next/navigation";
export const HomePage = () => {
  const isAuth = useAppSelector((state) => state.isAuth);
  const router = useRouter();
  if (!isAuth) {
    router.replace("/auth");
  }
  const userEmail = useAppSelector((state) => state.user.login);
  return (
    <>
      <h1>Hello</h1>
    </>
  );
};
