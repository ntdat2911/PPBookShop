"use client";
import { useSession } from "next-auth/react";
import { ProfileSection } from "./avatar";
import ProfileEdit from "./ProfileEdit";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ChangePassword from "./ChangePassword";
import { OrderDetail } from "./OrderDetail";

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { tab: string };
}) {
  const { data: session } = useSession();
  const [page, setPage] = useState(searchParams.tab || "profile");
  return (
    <div className=" pt-8 grid grid-cols-7">
      <div className="w-full h-full flex flex-col ">
        <Button
          variant="ghost"
          className={cn(
            "bg-light-brown hover:bg-medium-brown border ",
            page === "profile" && "bg-medium-brown text-white"
          )}
          onClick={() => setPage("profile")}
        >
          Profile
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "bg-light-brown hover:bg-medium-brown border ",
            page === "password" && "bg-medium-brown text-white"
          )}
          onClick={() => setPage("password")}
        >
          Change password
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "bg-light-brown hover:bg-medium-brown border ",
            page === "order" && "bg-medium-brown text-white"
          )}
          onClick={() => setPage("order")}
        >
          Order
        </Button>
      </div>
      <div className="col-span-6 grid grid-cols-4 mx-4">
        {page === "profile" && (
          <>
            <div>
              <ProfileSection user={session?.user} />
            </div>
            <div className="col-span-3 flex flex-col">
              {session?.user && <ProfileEdit user={session?.user} />}
            </div>
          </>
        )}

        {page === "password" && (
          <>
            <div className="col-span-4 flex flex-col">
              {session?.user && <ChangePassword user={session?.user} />}
            </div>
          </>
        )}

        {page === "order" && (
          <>
            <div className="col-span-4 flex flex-col">
              {session?.user && <OrderDetail user={session?.user} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
