"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgotPassword } from "@/services/auth/service";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Link from "next/link";
const formSchema = z.object({
  emailOrUsername: z
    .string()
    .email("Invalid email address")
    .or(
      z.string().min(5, { message: "Username must be at least 3 characters" })
    )
    .refine(
      (value) => {
        return !value.includes(" ");
      },
      { message: "Username cannot contain spaces" }
    ),
});

export default function Page() {
  const [isSent, setIsSent] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUsername: "",
    },
  });
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await forgotPassword(values.emailOrUsername);
    toast({
      title: "Password reset email sent",
      variant: "success",
    });
    setIsSent(true);
  };
  return (
    <div className="container flex flex-col justify-center w-1/2 mt-8">
      <div className="mx-auto grid gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Reset password</h1>
        </div>
        {!isSent ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="emailOrUsername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Reset password
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="text-center">
            <p className="text-balance text-muted-foreground">
              If an account with that email exists, we sent you an email with
              instructions to reset your password.
            </p>
            <p className="text-balance text-muted-foreground">
              If you dont receive an email, please check your spam folder.
            </p>
            <Link href="/auth/sign-in" className="underline">
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
