import React from "react";

const ConfirmEmailLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="max-w-[500px] mx-auto mt-8">{children}</main>;
};

export default ConfirmEmailLayout;
