import { Apple } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavLogo = () => {
  return (
    <Link
      href={"/"}
      className="text-3xl font-bold text-primary flex items-center gap-1"
    >
      <Apple size={32} fill="4" />
      ICORE
    </Link>
  );
};

export default NavLogo;
