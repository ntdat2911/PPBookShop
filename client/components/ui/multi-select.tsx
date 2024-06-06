import * as React from "react";
import { cn } from "@/lib/utils";

import { Check, X, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";

export type OptionType<T, T1> = {
  tag_name: T;
  id: T1;
};

interface MultiSelectProps {
  options: OptionType<string, string>[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  filterName: string;
}

function MultiSelect({
  filterName,
  options,
  selected,
  onChange,
  className,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <div className="flex gap-1 flex-wrap">
        {selected.map((item) => (
          <Badge
            variant="outline"
            key={item}
            className="mr-1 mb-1 mt-2 border border-dark-brown rounded-full transition-colors text-xs font-medium cursor-pointer"
            onClick={() => handleUnselect(item)}
          >
            {options.find((option) => option.id === item)?.tag_name}
            <button
              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUnselect(item);
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={() => handleUnselect(item)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="mr-1 mb-1 mt-2 h-8 px-2.5 py-1 border-dark-brown transition-colors text-xs font-medium rounded-full text-black"
            onClick={() => setOpen(!open)}
            type="button"
          >
            Add {filterName}
            <Plus className="ml-1 h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </div>
      {/* <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" /> */}
      <PopoverContent
        className="w-full max-w-72 p-0"
        side="right"
        align="start"
      >
        <Command className={className}>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options &&
              options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => {
                    onChange(
                      selected.includes(option.id)
                        ? selected.filter((item) => item !== option.id)
                        : [...selected, option.id]
                    );
                    setOpen(true);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.tag_name}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
