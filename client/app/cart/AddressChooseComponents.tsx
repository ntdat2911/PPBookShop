"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { GET_ADDRESSES_BY_USER_ID } from "@/services/addresses/queries";
import { useQuery } from "@apollo/client";
import { Edit } from "lucide-react";

import { useEffect, useState } from "react";
import { UploadAddress } from "./UploadAddress";

interface AddressProps {
  UserID: string;
}

export const AddressChooseComponents = ({ UserID }: AddressProps) => {
  const { data, loading, error } = useQuery(GET_ADDRESSES_BY_USER_ID, {
    variables: { UserID },
    fetchPolicy: "network-only",
  });
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  useEffect(() => {
    if (data?.getAddressesByUserId && data.getAddressesByUserId.length > 0) {
      data.getAddressesByUserId.map((address) => {
        console.log(address);
        if (address.IsDefault) {
          setSelectedAddress(address.AddressID);
        }
      });
    }
  }, [data]);
  return (
    <Dialog>
      <DialogTrigger className="border-2 border-gray-200 rounded-lg min-h-12 p-2 flex justify-between items-center">
        {selectedAddress ? (
          <>
            <p className="text-start text-md">
              {data?.getAddressesByUserId &&
                data.getAddressesByUserId.map((address) => {
                  if (address.AddressID == selectedAddress) {
                    return (
                      <>
                        <span className="text-md">
                          Receiver: {address.ReceiverName} - Phone:{" "}
                          {address.Phone}
                        </span>
                        <br />
                        <span className="text-md">
                          Address: {address.Address}
                        </span>
                      </>
                    );
                  }
                })}
            </p>
            <Edit className="w-6 h-6" />
          </>
        ) : (
          <DialogDescription className="text-gray-500">
            Choose address
          </DialogDescription>
        )}
      </DialogTrigger>
      <DialogContent className="w-1/2 h-2/3 flex flex-col">
        <DialogHeader>
          <DialogTitle>Choose address</DialogTitle>
        </DialogHeader>

        <RadioGroup
          className="flex flex-col h-full"
          onValueChange={setSelectedAddress}
          defaultValue={selectedAddress ?? ""}
        >
          <div className="border border-gray-500 rounded-md p-4 h-full">
            <ScrollArea className="min-h-full overflow-visible">
              {data?.getAddressesByUserId &&
              data.getAddressesByUserId.length > 0 ? (
                data.getAddressesByUserId.map((address) => (
                  <Card
                    key={address.AddressID}
                    className={cn(
                      "my-2",
                      selectedAddress == address.AddressID
                        ? "border-blue-600 border-2"
                        : ""
                    )}
                  >
                    <CardContent className="p-2">
                      <div className="grid grid-cols-6">
                        <div className="flex flex-col justify-center col-span-5">
                          <p className="text-md w-5/6 truncate">
                            {address.ReceiverName} - {address.Phone}
                          </p>
                          <p className="text-md">{address.Address}</p>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2 justify-items-end">
                          <RadioGroupItem
                            value={address.AddressID}
                            id={address.AddressID}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No resumes found</p>
              )}
            </ScrollArea>
          </div>

          <div className="flex justify-start">
            <div className="flex flex-col items-center">
              <UploadAddress UserID={UserID} />
            </div>
          </div>
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
};
