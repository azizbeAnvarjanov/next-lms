import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleDashed, Mail, Moon, MoreVertical, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const SideBottomDropdown = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 outline-none"
          >
            <MoreVertical className="h-3.5 w-3.5" />
            <span className="sr-only">
              <CircleDashed size={15} />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>
            <Mail size={15} className="mr-2" /> Contact
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Moon size={15} className="mr-2" /> Dark mode
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Sun size={15} className="mr-2" /> Light mode
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SideBottomDropdown;
