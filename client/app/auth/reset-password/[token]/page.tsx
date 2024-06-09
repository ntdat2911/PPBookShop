import { UserDto } from "@/services/auth/dto";
import { confirmEmail } from "@/services/auth/service";
import { redirect } from "next/navigation";
import ResetPassword from "./ResetPasswordForm";

export default async function Page({ params }: { params: { token: string } }) {
  return (
    <div className="container flex flex-col justify-center w-1/2 mt-8">
      <ResetPassword token={params.token} />
    </div>
  );
}
