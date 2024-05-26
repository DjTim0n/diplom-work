"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import api from "@/service/axios";
import { setIsAuth, setUser } from "@/service/redux/reducers/authSlice";
import { useAppDispatch } from "@/service/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DialogAuth } from "./Dialog";

export const FormAuth = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSingIn = async (e: any) => {
    e.preventDefault();
    if ((!email && !pass) || !email || !pass) {
      toast({
        title: "Error",
        description: "Заполните данные",
      });
    } else {
      try {
        const res = await api.post("/Auth/Login", {
          email: email,
          password: pass,
        });
        dispatch(setIsAuth(true));
        dispatch(
          setUser({
            access_token: res.data.accessToken,
            login: email,
            refresh_token: res.data.refreshToken,
          })
        );
        router.push("/");
      } catch (error) {
        toast({
          title: "Error",
          description: `${error}`,
        });
        console.error(error);
      }
    }
  };

  return (
    <>
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        placeholder="Пароль"
        type="password"
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
        }}
      />
      <p className="text-center">
        Нет аккаунта?{" "}
        <Link className="underline" href={"/reg"}>
          Зарегистрироваться
        </Link>
      </p>
      <Button
        onClick={(e) => {
          handleSingIn(e);
        }}
        className="w-1/2 m-auto mt-2"
      >
        Войти
      </Button>

      <DialogAuth />
    </>
  );
};
