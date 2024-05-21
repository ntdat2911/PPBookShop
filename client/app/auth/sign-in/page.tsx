"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "@/components/ui/use-toast";

import { useAppDispatch, useAppSelector } from "@/redux/store";

import { useEffect } from "react";
import { signIn } from "@/services/auth/service";
import { SignInRequestDto } from "@/services/auth/dto";
import { login } from "@/redux/authSlice";
import { saveAuthStateToLocalStorage } from "@/lib/local-storage";

const formSchema = z.object({
  emailOrUsername: z.string(),
  password: z.string(),
});

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    const userLogin: SignInRequestDto = {
      emailOrUsername: values.emailOrUsername,
      password: values.password,
    };
    try {
      const user = await signIn(userLogin);
      dispatch(login(user));
      saveAuthStateToLocalStorage(user);
      console.log("Login successfully!", user);
      toast({
        title: "Login successfully!",
        duration: 3000,
        variant: "success",
      });

      console.log("Login successfully!", user);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Login failed!",
        description: error?.toString(),
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // if (authState.isLoggedIn) {
    //   router.replace("/");
    // }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  return (
    <div className="container flex flex-col justify-center w-1/2 mt-8">
      <div className="mx-auto grid gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="emailOrUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your email or username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/auth/send-reset-password"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full bg-black">
                Login
              </Button>
              {/*<Button variant="outline" className="w-full" onSubmit={}>*/}
              {/*  Login with Google*/}
              {/*</Button>*/}
            </div>
          </form>
        </Form>

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
