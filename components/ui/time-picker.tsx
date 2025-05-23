"use client";

import * as React from "react";
import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimePickerProps = {
  value?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function TimePicker({
  value,
  onChange,
  placeholder = "Sélectionner une heure",
  className,
  disabled = false,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Générer les options d'heures (de 06:00 à 23:00 par tranches de 30 minutes)
  const timeOptions = React.useMemo(() => {
    const options: string[] = [];
    for (let hour = 6; hour <= 23; hour++) {
      options.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour < 23) {
        options.push(`${hour.toString().padStart(2, "0")}:30`);
      }
    }
    return options;
  }, []);

  // Formater l'affichage de l'heure
  const formatTime = (time: string) => {
    if (!time) return placeholder;
    const [hour, minute] = time.split(":");
    return `${hour}h${minute}`;
  };

  const handleSelect = (selectedTime: string) => {
    if (onChange) {
      onChange(selectedTime);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value ? formatTime(value) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-3">
          <Select value={value} onValueChange={handleSelect}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choisir l'heure" />
            </SelectTrigger>
            <SelectContent>
              <div className="max-h-[200px] overflow-y-auto">
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {formatTime(time)}
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
