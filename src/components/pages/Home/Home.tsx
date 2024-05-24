"use client";

import { Button } from "@/components/ui/button";
import { setIsAuth, setUser } from "@/service/redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "@/service/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DialogEditProfile } from "./Dialog";
import api from "@/service/axios";
export const HomePage = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user?.login);
  const access_token = useAppSelector((state) => state.auth.user?.access_token);
  const [isClient, setIsClient] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setIsClient(true);
    if (!isAuth) {
      router.replace("/auth");
    }
  }, [isAuth]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/Profile", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setUserData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [access_token]);

  useEffect(() => {
    console.log("userdata: ", userData);
  }, [userData]);

  const handleLogOut = (e: any) => {
    e.preventDefault();
    dispatch(setIsAuth(false));
    dispatch(setUser(undefined));
  };

  if (!isClient) {
    return null; // or a loading spinner if you prefer
  }

  return (
    <>
      <div className="container flex flex-col items-center">
        {user ? <h1>Hello {user}</h1> : <h1>Hello Unnamed</h1>}
        <div className="container flex flex-col items-center m-2 gap-4">
          <DialogEditProfile userData={userData} />
          <Button
            onClick={(e) => {
              handleLogOut(e);
            }}
          >
            Выйти
          </Button>
        </div>
      </div>
    </>
  );
};
