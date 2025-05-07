import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ProviderLogin from "./provider-login";
import AuthFooter from "./auth-footer";

type AuthFormProps = {
  children: React.ReactNode;
  formTitle: string;
  showProvider: boolean;
  footerLabel: string;
  footerHref: string;
};

const AuthForm = ({
  children,
  formTitle,
  showProvider,
  footerLabel,
  footerHref,
}: AuthFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{formTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        <div className="flex items-center gap-2 mb-2">
          <p className="border border-gray-300 w-full"></p>
          <p>or</p>
          <p className="border border-gray-300 w-full"></p>
        </div>
        {showProvider && <ProviderLogin />}
      </CardContent>
      <CardFooter>
        <AuthFooter footerLabel={footerLabel} footerHref={footerHref} />
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
