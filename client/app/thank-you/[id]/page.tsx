import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="container">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center flex flex-col items-center justify-center space-y-4 text-dark-brown">
          <CheckCircle size={150} className="text-pretty " />
          <h1 className="text-4xl font-bold text-pretty">
            Thank you for your purchase
          </h1>
          <h1 className="text-4xl font-bold text-pretty">
            and supporting my small business!{" "}
          </h1>
          <p className="text-lg mt-4">Your order ID is: {params.id}</p>
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-full border-2 border-medium-brown "
            >
              Back to home page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
