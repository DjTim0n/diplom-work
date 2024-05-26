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
import { useAppSelector } from "@/service/redux/store";

export const DialogEditProfile = ({ userData }: { userData?: any }) => {
  console.log("🚀 ~ DialogEditProfile ~ userData:", userData);
  const access_token = useAppSelector((state) => state.auth.user?.access_token);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [userIdentity, setUserIdentity] = useState<string>("");

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setDescription(userData.description);
      setUserIdentity(userData.userIdentity);
    }
  }, [userData]);

  console.log("🚀 ~ DialogEditProfile ~ name:", name);
  const handleSaveProfile = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.put(
        "/Profile",
        {
          firstName: firstName,
          lastName: lastName,
          description: description,
          userIdentity: userIdentity,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (res.status === 204) {
        alert("Успешно сохранено");
      }
    } catch (error) {}
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Редактировать профиль</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Профиль</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link">Имя</Label>
              <Input
                id="link"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link">Фамилия</Label>
              <Input
                id="link"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link">О себе</Label>
              <Input
                id="link"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link">ИИН</Label>
              <Input
                id="link"
                value={userIdentity}
                onChange={(e) => {
                  setUserIdentity(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              onClick={(e) => handleSaveProfile(e)}
              variant="secondary"
            >
              Сохранить
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Закрыть</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
