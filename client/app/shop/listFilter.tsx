"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { MultiSelect, OptionType } from "@/components/ui/multi-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CaretSortIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterAuthor } from "@/services/authors/dto";
import { useEffect, useState } from "react";
import { useSearchParamsContext } from "./searchParamsContext";

const rating = [
  { value: "5", label: "5" },
  { value: "4", label: "4-5" },
  { value: "3", label: "3-4" },
  { value: "2", label: "2-3" },
  { value: "1", label: "1-2" },
];

const formSchema = z.object({
  page: z.number().optional(),
  rating: z.array(z.string()).optional(),
  category: z.array(z.string()).optional(),
  author: z.array(z.string()).optional(),
});

interface ListFilterProps {
  authorList: OptionType<string, string>[];
  categoryList: OptionType<string, string>[];
}

export const ListFilter = ({ authorList, categoryList }: ListFilterProps) => {
  const { searchParams, setSearchParams } = useSearchParamsContext();
  const [currentForm, setCurrentForm] = useState<z.infer<typeof formSchema>>(
    {}
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      page: 1,
      rating: searchParams.rating || [],
      category: searchParams.category || [],
      author: searchParams.author || [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
  }

  const watchAllFields = form.watch();

  useEffect(() => {
    if (
      watchAllFields.author !== currentForm.author ||
      watchAllFields.category !== currentForm.category ||
      watchAllFields.rating !== currentForm.rating
    ) {
      setCurrentForm(watchAllFields);
      setSearchParams({
        ...searchParams,
        page: 1,
        author: watchAllFields.author,
        category: watchAllFields.category,
        rating: watchAllFields.rating,
      });
    }
  }, [watchAllFields, currentForm]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <ScrollArea>
          <div className="my-2">
            <Label
              key="category"
              className="flex flex-1 items-center justify-between py-2 font-medium transition-all text-lg"
            >
              Categories
            </Label>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <MultiSelect
                    filterName="category"
                    selected={field.value || []}
                    options={categoryList}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="bg-gray-300 my-4" />

          <div key="rating" className="my-2">
            <Label
              key="rating"
              className="flex flex-1 items-center justify-between pb-4 font-medium transition-all text-lg"
            >
              Rating Review
            </Label>
            <FormField
              control={form.control}
              name="rating"
              render={() => (
                <FormItem>
                  {rating.map((item) => (
                    <FormField
                      key={"rating" + item.value}
                      control={form.control}
                      name="rating"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item as any}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={
                                  Array.isArray(field.value) &&
                                  field.value.includes(item.value ?? "")
                                }
                                onCheckedChange={(checked: any) => {
                                  return checked
                                    ? field.onChange([
                                        ...(Array.isArray(field.value)
                                          ? field.value
                                          : []),
                                        item.value,
                                      ])
                                    : field.onChange(
                                        Array.isArray(field.value)
                                          ? field.value.filter(
                                              (value: any) =>
                                                value !== item.value
                                            )
                                          : []
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="flex items-center">
                              {item.label}{" "}
                              <StarFilledIcon className="text-yellow-500" />
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="bg-gray-300 my-4" />

          <div className="my-2">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Author</FormLabel>
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <MultiSelect
                          filterName="authors"
                          selected={field.value || []}
                          options={authorList}
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
};
