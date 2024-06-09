"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getFromLocalStorage, writeToLocalStorage } from "@/lib/localStorage";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddressChooseComponents } from "./AddressChooseComponents";
import { Label } from "@/components/ui/label";
import { CREATE_ORDER } from "@/services/orders/queries";
import { useMutation } from "@apollo/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isArray } from "@apollo/client/utilities";
import { useCartContext } from "../CartContext";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ItemType {
  BookImage: string;
  BookID: string;
  BookTitle: string;
  Quantity: number;
  Price: number;
  Promotion: any;
  Discount: number;
}
const FormSchema = z.object({
  paymentMethod: z.enum(["COD", "PAYPAL"], {
    required_error: "You need to select a payment method.",
  }),
});
export default function Page() {
  const { data: session } = useSession();
  const [items, setItems] = useState([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { toast } = useToast();
  const [addressID, setAddressID] = useState<string>("");
  const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER);
  const router = useRouter();
  const { cartCount, setCartCount } = useCartContext();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (session?.user.id) {
      if (addressID === "") {
        toast({
          title: "Address is required",
          description: "Please choose an address to continue.",
          variant: "destructive",
        });
        return;
      }
      const order = await createOrder({
        variables: {
          UserID: session.user.id,
          TotalPrice: Object.entries(items).reduce(
            (acc, [key, item]: [string, ItemType]) =>
              acc +
              item.Price *
                item.Quantity *
                (item.Discount > 0 ? (100 - item.Discount) / 100 : 1),
            0
          ),
          Status: "PENDING",
          AddressID: addressID,
          PaymentMethod: data.paymentMethod,
          OrderItems: JSON.stringify(items),
        },
      });
      if (order?.data)
        router.push(`/thank-you/${order?.data.createOrder.OrderID}`);
      writeToLocalStorage(session.user.id, {});
      setItems([]);
    }
  }
  useEffect(() => {
    if (session) {
      const tempItem = getFromLocalStorage(session.user.id);
      setItems(tempItem);
    }
  }, [session?.user.id]);

  if (!session) {
    return;
  }
  const setQuantity = (id: string, quantity: number) => {
    setItems((prevItems) => {
      const newItems = {
        ...prevItems,
        [id]: {
          ...(prevItems[id] as ItemType),
          Quantity: quantity > 0 ? quantity : 1,
        },
      };
      writeToLocalStorage(session.user.id, newItems);
      return newItems;
    });
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => {
      const newItems = { ...prevItems };
      delete newItems[id as keyof typeof newItems];
      writeToLocalStorage(session.user.id, newItems);
      return newItems;
    });
    setCartCount(cartCount - 1);
  };

  const handleDiscountChange = (id: string, discount: number) => {
    setItems((prevItems) => {
      const newItems = {
        ...prevItems,
        [id]: {
          ...(prevItems[id] as ItemType),
          Discount: discount,
        },
      };
      writeToLocalStorage(session.user.id, newItems);
      return newItems;
    });
  };

  const handleAddressChange = (addressID: string) => {
    setAddressID(addressID);
  };
  return (
    <div
      className={cn(
        "container py-4 space-y-8",
        loading ? "bg-gray-200 opacity-75 z-10" : ""
      )}
    >
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 h-full">
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-bold">Cart</h1>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-2 justify-center items-center text-center">
                <div className="text-lg font-bold">Product</div>
                <div className="text-lg font-bold">Title</div>
                <div className="text-lg font-bold">Quantity</div>
                <div className="text-lg font-bold">Unit price</div>
                <div className="text-lg font-bold col-span-2">Discount</div>

                <div className="text-lg font-bold">Total</div>
                <div className="text-lg font-bold"></div>
              </div>
              {items &&
                Object.entries(items).map(([key, item]: [string, ItemType]) => (
                  <>
                    <Separator />
                    <div
                      key={key}
                      className="grid grid-cols-8 gap-2 h-max my-4 justify-center items-center text-center"
                    >
                      <div>
                        <Image
                          src={item.BookImage}
                          alt={item.BookTitle}
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      </div>
                      <div>{item.BookTitle}</div>
                      <div className="flex justify-center">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => setQuantity(key, item.Quantity - 1)}
                        >
                          <Minus className="w-6 h-6" />
                        </Button>
                        <Button size="icon" variant="outline">
                          {item.Quantity}
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => setQuantity(key, item.Quantity + 1)}
                        >
                          <Plus className="w-6 h-6" />
                        </Button>
                      </div>
                      <div className="">{item.Price}</div>
                      <div className="col-span-2">
                        {isArray(item.Promotion) &&
                        item.Promotion.length > 0 ? (
                          <Select
                            defaultValue={"0"}
                            onValueChange={(value: string) =>
                              handleDiscountChange(key, parseInt(value))
                            }
                          >
                            <SelectTrigger className="None">
                              <SelectValue placeholder="Choose Discount" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">None</SelectItem>
                              {item.Promotion.map((promotion: any) => (
                                <SelectItem
                                  key={
                                    promotion.PromotionID +
                                    promotion.DiscountPercent
                                  }
                                  value={promotion.DiscountPercent}
                                >
                                  {promotion.DiscountPercent}% -{" "}
                                  {promotion.PromotionName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          "None"
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {item.Discount > 0 ? (
                          <>
                            <p className="line-through text-xs text-red-400">
                              {item.Price * item.Quantity}
                            </p>
                            <p>
                              {(
                                item.Price *
                                item.Quantity *
                                ((100 - item.Discount) / 100)
                              ).toFixed(2)}
                              $
                            </p>
                          </>
                        ) : (
                          <p>{item.Price * item.Quantity}</p>
                        )}
                      </div>
                      <div className="flex justify-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteItem(key)}
                        >
                          <Trash2 className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </>
                ))}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col h-full">
          <Card className="p-2 pt-4 h-full">
            <CardContent>
              <div className="pb-2 flex flex-col gap-2">
                <AddressChooseComponents
                  UserID={session.user.id}
                  handleAddressChange={handleAddressChange}
                />
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="pb-2">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Choose payment method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="COD" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  COD
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="PAYPAL" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  PAYPAL
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <span className="text-lg font-bold">Total:</span> $
                    {items &&
                      Object.entries(items)
                        .reduce(
                          (acc, [key, item]: [string, ItemType]) =>
                            acc +
                            item.Price *
                              item.Quantity *
                              (item.Discount > 0
                                ? (100 - item.Discount) / 100
                                : 1),
                          0
                        )
                        .toFixed(2)}
                  </div>
                  <Button type="submit">Checkout</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
