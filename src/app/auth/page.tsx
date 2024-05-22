import { FormAuth } from "@/components/pages/Auth/Form";

export default function Auth() {
  return (
    <>
      <div className="container flex justify-center m-auto">
        <div className="flex flex-col justify-center gap-4">
          <h1 className="w-1/2 m-auto text-center p-2">Вход</h1>
          <FormAuth />
        </div>
      </div>
    </>
  );
}
