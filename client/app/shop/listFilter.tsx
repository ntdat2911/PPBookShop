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
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterAuthor } from "@/services/authors/dto";
import { useEffect } from "react";

const rating = ["5 ★★★★★", "4 ★★★★", "3 ★★★", , "2 ★★", "1 ★"];
const categoryList: OptionType[] = [
  {
    id: "1",
    tag_name: "Novel",
  },
  {
    id: "2",
    tag_name: "Comic",
  },
  {
    id: "3",
    tag_name: "Manga",
  },
  {
    id: "4",
    tag_name: "Light Novel",
  },
  {
    id: "5",
    tag_name: "Webtoon",
  },
  {
    id: "6",
    tag_name: "Manhwa",
  },
  {
    id: "7",
    tag_name: "Manhua",
  },
  {
    id: "8",
    tag_name: "Doujinshi",
  },
  {
    id: "9",
    tag_name: "Other",
  },
  {
    id: "10",
    tag_name: "All",
  },
];

const formSchema = z.object({
  // size: z.number().optional(),
  page: z.number().optional(),
  rating: z.array(z.string()).optional(),
  category: z.array(z.string()).optional(),
  author: z.string({
    required_error: "Please select a language.",
  }),
});
interface ListFilterProps {
  authorList: FilterAuthor[];
}

export const ListFilter = ({ authorList }: ListFilterProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      page: 1,
      rating: [],
      category: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
  }
  const watchAllFields = form.watch();
  useEffect(() => {
    console.log("watchAllFields", watchAllFields);
  }, [watchAllFields]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <ScrollArea>
          <div className="my-2">
            <Label
              key="rating"
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
                      key={item}
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
                                  field.value.includes(item ?? "")
                                }
                                onCheckedChange={(checked: any) => {
                                  return checked
                                    ? field.onChange([
                                        ...(Array.isArray(field.value)
                                          ? field.value
                                          : []),
                                        item,
                                      ])
                                    : field.onChange(
                                        Array.isArray(field.value)
                                          ? field.value.filter(
                                              (value: any) => value !== item
                                            )
                                          : []
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="">{item}</FormLabel>
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? authorList.find(
                                (author) => author.AuthorID === field.value
                              )?.AuthorName
                            : "Select author"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search framework..."
                          className="h-9"
                        />
                        <CommandEmpty>No author found.</CommandEmpty>
                        <CommandGroup>
                          {authorList.map((author) => (
                            <CommandItem
                              value={author.AuthorName}
                              key={author.AuthorID}
                              onSelect={() => {
                                form.setValue("author", author.AuthorID);
                              }}
                            >
                              {author.AuthorName}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  author.AuthorID === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
