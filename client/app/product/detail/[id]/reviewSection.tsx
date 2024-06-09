"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { StarFilledIcon } from "@radix-ui/react-icons";
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
import { Button } from "@/components/ui/button";
import { gql, useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "@/services/reviews/queries";
import { useSession } from "next-auth/react";
import { useReviewContext } from "./reviewContext";
import { useToast } from "@/components/ui/use-toast";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
const ratingList = [
  {
    id: 5,
    label: "5",
  },
  {
    id: 4,
    label: "4",
  },

  {
    id: 3,
    label: "3",
  },

  {
    id: 2,
    label: "2",
  },
  {
    id: 1,
    label: "1",
  },
];

const FormSchema = z.object({
  rating: z.string({
    required_error: "Please select an rating to feedback",
  }),
  title: z.string().min(2, {
    message: "Please enter a title with at least 2 characters",
  }),
  comment: z
    .string()
    .min(1, {
      message: "Comment must be at least 1 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

interface ReviewSectionProps {
  bookID: string;
}

export default function ReviewSection({ bookID }: ReviewSectionProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { reviewInfo, setReviewInfo } = useReviewContext();
  const { toast } = useToast();
  const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rating: data?.createReview.Rating.toString() || "",
      title: "",
      comment: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const userID = session?.user?.id;
    if (!userID) {
      return;
    }
    createReview({
      variables: {
        bookID: bookID,
        userID: userID,
        title: data.title,
        comment: data.comment,
        rating: parseInt(data.rating),
      },
    });

    reviewInfo.countReviewList[parseInt(data.rating) - 1] += 1;
    // window.location.reload();
  }
  useEffect(() => {
    if (loading === false && data) {
      toast({
        title: "Comment successfully!",
      });
      form.reset();
      setReviewInfo({
        ...reviewInfo,
        isFetching: !reviewInfo.isFetching,
      });
    }
    router.refresh();
  }, [loading]);
  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      {session?.user.id ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full items-start gap-6"
          >
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Write reviews
              </legend>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ratingList.map((rating) => (
                            <SelectItem key={rating.id} value={rating.label}>
                              <div
                                className="flex flex-row items-center"
                                key={"rating" + rating.id}
                              >
                                <StarFilledIcon className="w-5 h-5 text-yellow-500" />
                                <span className="ml-2">{rating.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter title" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what you think"
                          className="resize-none min-h-[9.5rem]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <Button type="submit">Comment</Button>
              </div>
            </fieldset>
          </form>
        </Form>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Button onClick={() => router.push("/auth/sign-in")}>
            Sign in to write a review
          </Button>
        </div>
      )}
    </div>
  );
}
