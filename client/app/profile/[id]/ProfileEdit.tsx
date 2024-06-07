"use client";
import React, { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/components/ui/use-toast";
import { signUp } from "@/services/auth/service";
import { SignUpRequestDto, UserDto } from "@/services/auth/dto";
import { useSession } from "next-auth/react";
import { getUser, updateProfile } from "@/services/users/service";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(50),
  email: z.string().email().optional(),
});

const ProfileEdit = () => {
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(session?.user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: currentUser?.email,
      name: currentUser?.username,
    },
  });

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  useEffect(() => {
    async function fetchUser() {
      if (!session?.user.accessToken) return;
      const response = await getUser(session?.user.accessToken as string);
      const user = response.data;
      setCurrentUser(user);
    }
    fetchUser();
  }, [session?.user.accessToken]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userChange = {
        name: values.name,
        email: values.email,
      };
      if (!session?.user.id || !session?.user.accessToken)
        throw new Error("User not found");
      const response = await updateProfile(
        session?.user.id as string,
        userChange.name,
        session?.user.accessToken
      );
      await update({
        ...session,
        user: {
          ...session?.user,
          ...userChange,
        },
      });
      reloadSession();
      toast({
        title: "Profile updated!",
        description: `Welcome!`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Sign up failed!",
        description: error?.toString(),
      });
    }
  }
  console.log("session", session);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="">
          <CardHeader className="items-center">
            <CardTitle>Information</CardTitle>
          </CardHeader>
          <CardContent className="px-auto flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-end">
            <Button
              type="submit"
              className="bg-medium-brown hover:bg-dark-brown"
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ProfileEdit;
