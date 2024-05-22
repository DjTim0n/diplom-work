import { FormReg } from "@/components/pages/Reg/Form";

export default function Reg() {
  return (
    <>
      <div className="container flex justify-center m-auto">
        <div className="flex flex-col justify-center gap-4">
          <h1 className="w-1/2 m-auto text-center p-2">Регистрация</h1>
          <FormReg />
        </div>
      </div>
    </>
  );
}
