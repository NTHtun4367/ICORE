"use client";
import { Button } from "../ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";

const ProviderLogin = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        variant={"outline"}
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        Login with google
        <FcGoogle />
      </Button>
      <Button
        variant={"outline"}
        onClick={() =>
          signIn("github", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        Login with github
        <FaGithub />
      </Button>
    </div>
  );
};

export default ProviderLogin;
