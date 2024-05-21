"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function underlineAnimation() {
  return "relative text-black hover:no-underline hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[40%] before:bottom-2 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[40%] after:bottom-2 after:right-[50%]";
}
export function Header() {
  const [isClientRendering, setIsClientRendering] = useState<boolean>(false);
  const authState = false;
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClientRendering(true);
    }
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 border-b border-border/40 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center my-0.5">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2 pb-2" href="/">
            <Image
              src="/logo.png"
              alt="CareerCompass Logo"
              width={150}
              height={50}
              className="bg-cover"
            />
          </a>
          {isClientRendering && (
            <>
              <nav className="flex items-center gap-6">
                <Button asChild variant="link">
                  <Link href="/search" replace className={underlineAnimation()}>
                    All jobs
                  </Link>
                </Button>
                <Button asChild variant="link">
                  <Link
                    href="/about-us"
                    replace
                    className={underlineAnimation()}
                  >
                    About us
                  </Link>
                </Button>
                <Button asChild variant="link">
                  <Link href="/editor" replace className={underlineAnimation()}>
                    Resume Editor
                  </Link>
                </Button>
                <Button asChild variant="link">
                  <Link
                    href="/candidate/2"
                    replace
                    className={underlineAnimation()}
                  >
                    Candidate
                  </Link>
                </Button>
                <Button asChild variant="link">
                  <Link
                    href="/recruiter/management"
                    replace
                    className={underlineAnimation()}
                  >
                    Recruiter
                  </Link>
                </Button>
              </nav>
            </>
          )}
        </div>
        {isClientRendering ? (
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end text-sm ">
            {authState ? (
              // <ProfileAvatar />
              <></>
            ) : (
              <div className="flex items-center">
                <Button asChild variant="link">
                  <Link href="/auth/sign-in">Login</Link>
                </Button>
                <Button asChild className="bg-ocean-500 rounded-full">
                  <Link href="/auth/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}
