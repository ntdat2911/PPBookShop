import { UserDto } from "@/services/auth/dto";
import { confirmEmail } from "@/services/auth/service";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { confirmationToken: string };
}) {
  try {
    const response = await confirmEmail(params.confirmationToken);
    if (response.user && response.accessToken) {
      redirect("/auth/sign-in");
    } else {
      redirect("/");
    }
  } catch (error) {
    throw error;
  }
  return <div className="container"> </div>;
}
