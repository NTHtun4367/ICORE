import React from "react";

const ChangePasswordLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="max-w-[500px] mx-auto mt-8">{children}</main>;
};

export default ChangePasswordLayout;
