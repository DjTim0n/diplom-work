"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import api from "@/service/axios";
import { useAppDispatch } from "@/service/redux/store";
import Link from "next/link";
import { useState } from "react";

export const FormReg = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleSingIn = async (e: any) => {
    e.preventDefault();
    if ((!email && !pass) || !email || !pass) {
      toast({
        title: "Error",
        description: "Заполните данные",
      });
    } else {
      try {
        const res = await api.post("/Auth/Register", {
          email: email,
          password: pass,
          firstName: firstName,
          lastName: lastName,
        });
        console.log("res: ", res);
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
        placeholder="First name"
        type="text"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <Input
        placeholder="Last name"
        type="text"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        placeholder="Password"
        type="password"
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
        }}
      />
      <p className="text-center">
        Уже есть аккаунт?{" "}
        <Link className="underline" href={"/auth"}>
          Войти
        </Link>
      </p>
      <Button
        onClick={(e) => {
          handleSingIn(e);
        }}
        className="w-3/4 m-auto mt-2"
      >
        Зарегистрироваться
      </Button>
    </>
  );
};
