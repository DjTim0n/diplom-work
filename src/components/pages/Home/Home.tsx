"use client";

import { Button } from "@/components/ui/button";
import { setIsAuth, setUser } from "@/service/redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "@/service/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DialogEditProfile } from "./Dialog";
import api from "@/service/axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export const HomePage = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user?.login);
  const access_token = useAppSelector((state) => state.auth.user?.access_token);
  const [isClient, setIsClient] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [test, setTest] = useState("");
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

  const handleTakeECP = async (e: any) => {
    e.preventDefault();
    try {
      await api
        .get("/DigitalSignature/Generate", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/x-pkcs12" })
          );
          console.log(url);
          window.open(url, "_blank");
          setTest(url);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckECP = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected_file = e.target.files[0];
      if (selected_file) {
        const formData = new FormData();
        formData.append("certificateFile", selected_file);
        try {
          await api.post("/DigitalSignature/Verify", formData, {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          alert("Ваш ЭЦП прошёл проверку!");
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <>
      <div className="container flex flex-col items-center">
        {userData ? (
          <h1>Hello {userData?.firstName}</h1>
        ) : (
          <h1>Hello Unnamed</h1>
        )}
        <div className="container flex flex-col items-center m-2 gap-4">
          <DialogEditProfile userData={userData} />
          <Button
            onClick={(e) => {
              handleTakeECP(e);
            }}
          >
            Получить ЭЦП
          </Button>
          {/* {test ? (
            <a href={test} target="_blank" download={"ЭЦП.p12"}>
              Скачать ЭЦП
            </a>
          ) : (
            ""
          )} */}
          <Label htmlFor="file">Проверить ЭЦП</Label>
          <Input
            className="w-1/3"
            id="file"
            type="file"
            onChange={(e) => {
              handleCheckECP(e);
            }}
          />
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
