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
import { write } from "fs";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ItemType {
  BookImage: string;
  BookID: string;
  BookTitle: string;
  Quantity: number;
  Price: number;
}

export default function Page() {
  const { data: session } = useSession();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (session) {
      const tempItem = getFromLocalStorage(session.user.id);
      setItems(tempItem);
    }
  }, [session?.user.id]);

  if (!session) {
    return <div>loading...</div>;
  }
  const setQuantity = (id: string, quantity: number) => {
    setItems((prevItems) => {
      const newItems = {
        ...prevItems,
        [id]: {
          ...prevItems[id],
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
      delete newItems[id];
      writeToLocalStorage(session.user.id, newItems);
      return newItems;
    });
  };
  return (
    <div className="container py-4 space-y-8">
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-bold">Cart</h1>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-2 justify-center items-center text-center">
                <div className="text-lg font-bold">Product</div>
                <div className="text-lg font-bold">Title</div>
                <div className="text-lg font-bold">Quantity</div>
                <div className="text-lg font-bold">Unit price</div>
                <div className="text-lg font-bold">Total</div>
                <div className="text-lg font-bold"></div>
              </div>
              {items &&
                Object.entries(items).map(([key, item]: [string, ItemType]) => (
                  <>
                    <Separator />
                    <div
                      key={key}
                      className="grid grid-cols-6 gap-2 h-[100px] justify-center items-center text-center"
                    >
                      <div>
                        <Image
                          src={item.BookImage}
                          alt={item.BookTitle}
                          width={100}
                          height={100}
                          className="w-18 h-18 object-contain"
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
                      <div>{item.Price * item.Quantity}</div>
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
        <div className="flex flex-col">
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-bold">Total</h1>
            </CardHeader>
            <CardContent>
              <div>
                {items &&
                  Object.entries(items).reduce(
                    (acc, [key, item]: [string, ItemType]) =>
                      acc + item.Price * item.Quantity,
                    0
                  )}
              </div>
            </CardContent>
            <CardFooter>
              <Button>Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
