"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { ShoppingCartIcon } from "lucide-react";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  getTotalUniqueItems,
} from "@/lib/localStorage";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CART } from "@/services/carts/queries";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/app/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function underlineAnimation() {
  return "relative hover:no-underline hover:text-medium-brown cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-medium-brown before:origin-center before:h-[1px] before:w-0 hover:before:w-[40%] before:bottom-2 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-medium-brown after:origin-center after:h-[1px] after:w-0 hover:after:w-[40%] after:bottom-2 after:right-[50%]";
}
export function Header() {
  const { data: session } = useSession();
  const { cartCount, setCartCount } = useCartContext();
  const [updateCart, { data, loading, error }] = useMutation(UPDATE_CART);
  const router = useRouter();
  useEffect(() => {
    if (session?.user.id) {
      const count = getTotalUniqueItems(session?.user.id);
      setCartCount(count);
    }
  }, [session?.user.id]);

  const handleLogout = () => {
    if (session?.user.id) {
      const cart = getFromLocalStorage(session?.user.id);
      if (cart) {
        updateCart({
          variables: {
            UserID: session?.user.id,
            CartDetail: JSON.stringify(cart),
          },
        });
      }
      deleteFromLocalStorage(session?.user.id);
    }
    signOut();
  };
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

          <>
            <nav className="flex items-center gap-6">
              <Button asChild variant="link" className="text-dark-brown">
                <Link href="/shop" replace className={underlineAnimation()}>
                  Shop
                </Link>
              </Button>
              <Button asChild variant="link" className="text-dark-brown">
                <Link href="/about-us" replace className={underlineAnimation()}>
                  About us
                </Link>
              </Button>
            </nav>
          </>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end text-sm ">
          {session?.user ? (
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="relative">
                <Link
                  href="/cart"
                  className={cn(
                    "flex items-center space-x-2",
                    "hover:text-medium-brown"
                  )}
                >
                  <ShoppingCartIcon size={24} />
                </Link>
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <Badge
                    className="text-xs px-1 py-0.5 bg-medium-brown hover:bg-dark-brown"
                    variant="default"
                  >
                    {cartCount}
                  </Badge>
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name}
                    />
                    <AvatarFallback>{session.user.username}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Hi, {session.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push(`/profile/${session.user.id}`)}
                  >
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => handleLogout()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => signIn()}
                className="bg-medium-brown hover:bg-dark-brown"
              >
                Sign In
              </Button>
              <Button
                asChild
                className="border border-dark-brown hover:bg-super-light-brown"
                variant="outline"
              >
                <Link href="/auth/sign-up">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
