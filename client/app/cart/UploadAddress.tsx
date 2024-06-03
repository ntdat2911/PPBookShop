"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CREATE_ADDRESS } from "@/services/addresses/queries";
import { useMutation } from "@apollo/client";
import { useState } from "react";

interface UploadAddressProps {
  UserID: string;
}

const FormSchema = z.object({
  address: z.string().min(2, {
    message: "Address must be at least 10 characters.",
  }),
  receiverName: z.string().min(2, {
    message: "Receiver name must be at least 5 characters.",
  }),
  phone: z.string().min(10).max(10),
  isDefault: z.boolean().default(false).optional(),
});

export const UploadAddress = ({ UserID }: UploadAddressProps) => {
  const [createAddress, { data, loading, error }] = useMutation(CREATE_ADDRESS);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: "",
      receiverName: "",
      phone: "",
      isDefault: false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await createAddress({
      variables: {
        UserID,
        Address: data.address,
        ReceiverName: data.receiverName,
        Phone: data.phone,
        IsDefault: data.isDefault || false,
      },
    });
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="rounded-full h-9 px-4 py-2  border-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
        Add address
      </DialogTrigger>
      <DialogContent className="w-1/2 h-2/3 flex flex-col">
        <DialogHeader>
          <DialogTitle>Add address</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="receiverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Receiver name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      <span>Set as default address</span>
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
