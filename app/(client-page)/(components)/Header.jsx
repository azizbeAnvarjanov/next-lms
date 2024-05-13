"use client";
import UserSkeleton from "@/app/(skeletons)/UserSkeleton";
import { auth } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const Header = () => {
  const navigate = useRouter();
  const [signOut] = useSignOut(auth);
  const [user, userloading] = useAuthState(auth);
  const photoUrl = user?.photoURL;


  const logOut = async () => {
    await signOut().then(() => {
      toast.success("User logouted !");
    });
  };

  return (
    <div>
      <div className="h-[10vh] w-full navbar flex items-center justify-end py-2 px-4 lg:px-10 border-b-[1px] border-[--border ] bg-white lg:pl-[19%]">
        <div className="flex items-center gap-2">
          {user && (
            <>
              <Button onClick={logOut} variant="outline">
                <LogIn size={14} className="mr-1" /> logout
              </Button>
              <Button variant="outline" onClick={() => navigate.push("/admin")}>
                Admin
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate.push("/teacher")}
              >
                Teacher mode
              </Button>
            </>
          )}
          {userloading ? (
            <>
              <UserSkeleton />
            </>
          ) : (
            <>
              {user ? (
                <>
                  <DropdownMenu className="z-50 drop">
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full relative"
                      >
                        <Image
                          src={
                            photoUrl !== null || undefined ? photoUrl : "/placeholder.svg"
                          }
                          fill
                          alt="Avatar"
                          className="overflow-hidden rounded-full object-cover"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => navigate.push("/profile")}
                        className="cursor-pointer"
                      >
                        My Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>Support</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => navigate.push("/login")}
                    variant="outline"
                  >
                    Login
                  </Button>
                  <Button onClick={() => navigate.push("/register")}>
                    {" "}
                    Register
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
