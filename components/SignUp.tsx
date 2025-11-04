"use client";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useContext, useRef } from "react";
import { authContext } from "@/app/contexts/AuthContextWrapper";
import axios from "axios";
import BASE_URL from "@/BASE_URL";
import { useRouter } from "next/navigation"; 

interface Props {
  toggleSignIn: () => void;
}

const SignUp = ({ toggleSignIn }: Props) => {
  const auth = useContext(authContext);
  const router = useRouter();

  const usernameEl = useRef<HTMLInputElement>(null);
  const passwordEl = useRef<HTMLInputElement>(null);
  const repeatPasswordEl = useRef<HTMLInputElement>(null);

  const signup = async () => {
    const username = usernameEl.current?.value || "";
    const password = passwordEl.current?.value || "";
    const repeatPassword = repeatPasswordEl.current?.value || "";

    if (!username || !password || !repeatPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        username,
        password,
        password_repeat: repeatPassword
      });

      console.log("Signup success:", response.data);

      
      auth?.signin(response.data.user, response.data.token);

      router.push("/home");
    } catch (err: any) {
      console.error("Signup error:", err);
      alert(err.response?.data?.detail || "Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="text-center text-xl mb-2">Ready Steady Go!</div>
      <div>
        <Input
          placeholder="Please enter your username"
          className="mb-2 w-100"
          ref={usernameEl}
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Please enter your password"
          className="mb-2 w-100"
          ref={passwordEl}
        />
      </div>
      <Input
        type="password"
        placeholder="Repeat your password"
        className="mb-2 w-100"
        ref={repeatPasswordEl}
      />
      <div className="flex justify-between">
        <Button className="mr-2 hover:cursor-pointer" onClick={signup}>
          SIGN UP
        </Button>
        <button className="text-sm hover:cursor-pointer" onClick={toggleSignIn}>
          Already have an account?
        </button>
      </div>
    </div>
  );
};

export default SignUp;
