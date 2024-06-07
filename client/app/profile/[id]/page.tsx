"use client";
import { useSession } from "next-auth/react";
import { ProfileSection } from "./avatar";
import ProfileEdit from "./ProfileEdit";

export default function Page({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  return (
    <div className="container pt-8 grid grid-cols-4">
      <div>
        <ProfileSection user={session?.user} />
      </div>
      <div className="col-span-3 flex flex-col">
        <ProfileEdit />
      </div>
    </div>
  );
}
