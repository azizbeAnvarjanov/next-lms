"use client"
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/app/firebaseConfig";

const Register = () => {
  const [inputFileds, setInputFileds] = useState([]);
  const navigate = useRouter();

  const register = (e) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(
        auth,
        inputFileds.email,
        inputFileds.password
      )
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: inputFileds.fullName,
          }).then(() => toast.success("User success created !"));
          navigate.push("/");
        })
        .catch((err) => toast.error(err.message));
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };

  const signIn_provider = () => {
    signInWithPopup(auth, provider).then(() => {
      toast.success("User success created !");
      navigate("/");
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto py-6">
        <div className="hidden md:flex items-center justify-center">
          <img
            alt="Banner Image"
            className="aspect-[5/6] object-cover rounded-lg"
            height={600}
            src="/placeholder.svg"
            width={500}
          />
        </div>
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your information to get started.
            </p>
          </div>
          <form className="space-y-4" onSubmit={register}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  required
                  onChange={(e) =>
                    setInputFileds({ ...inputFileds, fullName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
              Create Account
            </Button>
          </form>
          <Button
            onClick={signIn_provider}
            className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800 border-[1px] border-[--border] w-full"
          >
            Sign in with Google
          </Button>
          <div className="text-center text-sm">
            Already have an account?
            <Link className="underline ml-2" href="/login">
              <strong>Login</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
