import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "@/service/axios";
import { useAppDispatch, useAppSelector } from "@/service/redux/store";
import { setIsAuth, setUser } from "@/service/redux/reducers/authSlice";
import { useRouter } from "next/navigation";

export const DialogAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleCheckECP = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected_file = e.target.files[0];
      if (selected_file) {
        const formData = new FormData();
        formData.append("certificateFile", selected_file);
        try {
          await api
            .post("/Auth/DigitalSignatureLogin", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.status === 200) {
                dispatch(
                  setUser({
                    access_token: res.data.accessToken,
                    refresh_token: res.data.refreshToken,
                  })
                );
                dispatch(setIsAuth(true));
                router.push("/");
              }
            })
            .catch((res) => {
              alert("Ключ устарел.");
            });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Войти с помощью ЭЦП</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Прикрепите ЭЦП</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">ЭЦП</Label>
            <Input
              id="link"
              type="file"
              onChange={(e) => {
                handleCheckECP(e);
              }}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
