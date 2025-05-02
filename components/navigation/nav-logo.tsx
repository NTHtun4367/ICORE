import { Apple } from "lucide-react";
import Link from "next/link";

const NavLogo = () => {
  return (
    <Link
      href={"/"}
      className="text-3xl font-bold text-primary flex items-center gap-1 font-serif"
    >
      <Apple size={36} className="fill-primary" />
      <span className="text-4xl italic">ICORE</span>
    </Link>
  );
};

export default NavLogo;
