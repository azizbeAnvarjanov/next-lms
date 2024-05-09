import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlay } from "lucide-react";
const LoginModal = () => {
  const navigate = useRouter();
  return (
    <Dialog className="">
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full text-black">
          <CirclePlay size={18} className="mr-2" /> Start watching
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in or Login</DialogTitle>
          <DialogDescription>to continue to platform</DialogDescription>
        </DialogHeader>
        <div className="w-full space-y-3">
          <Button
            type="submit"
            onClick={() => navigate("/login")}
            className="w-full shadow-none py-5"
          >
            Sign In
          </Button>
          <Button
            type="submit"
            onClick={() => navigate("/register")}
            variant="outline"
            className="w-full shadow-none py-5"
          >
            Register
          </Button>
        </div>

        <DialogFooter>
          <p className="text-[13px] text-gray-400">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
