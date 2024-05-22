"use client";

import Link from "next/link";
import SignInForm from "./SignInForm";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}
const LoginPage = ({ searchParams }: Props) => {
  return (
    <div className="container flex flex-col justify-center w-1/2 mt-8">
      <div className="mx-auto grid gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <SignInForm />

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
