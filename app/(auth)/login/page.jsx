"use client"
import { auth, provider } from "@/app/firebaseConfig";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";


const Login = () => {
  const [inputFileds, setInputFileds] = useState([]);
  const navigate = useRouter();

  const login = (e) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(auth, inputFileds.email, inputFileds.password)
        .then(() => {
          toast.success("User success created !");
          navigate.push("/");
        })
        .catch((err) => toast.error(err.message));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signIn_provider = () => {
    signInWithPopup(auth, provider).then(() => {
      toast.success("User success created !");
      navigate.push("/");
    });
  };

  return (
    <div>
      <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
        <Card className="w-full max-w-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={login}>
              <div className="space-y-5 mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  onChange={(e) =>
                    setInputFileds({ ...inputFileds, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    className="text-sm font-medium text-gray-900 underline transition-colors hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
                    href="#"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  required
                  type="password"
                  onChange={(e) =>
                    setInputFileds({ ...inputFileds, password: e.target.value })
                  }
                />
              </div>
              <Button className="w-full" type="submit">
                Sign in
              </Button>
            </form>
            <Button onClick={signIn_provider} className="w-full inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800 border-[1px] border-[--border]">
              Sign in with Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?
              <Link
                className="font-medium ml-2 text-gray-900 underline transition-colors hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
                href="/register"
              >
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
