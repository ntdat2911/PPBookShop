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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUsername: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await forgotPassword(values.emailOrUsername);
  };
  return (
    <div className="container flex flex-col justify-center w-1/2 mt-8">
      <div className="mx-auto grid gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Reset password</h1>
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-black">
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
