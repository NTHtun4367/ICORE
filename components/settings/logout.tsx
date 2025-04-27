"use client";

import SettingsCard from "./settings-card";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  return (
    <SettingsCard>
      <h2 className="text-sm font-semibold mb-4 text-red-600">Danger Zone</h2>
      <Button variant={"destructive"} onClick={() => signOut()}>
        <LogOut />
        Logout
      </Button>
    </SettingsCard>
  );
};

export default LogoutBtn;
