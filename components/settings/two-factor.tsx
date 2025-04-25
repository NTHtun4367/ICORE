import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import SettingsCard from "./settings-card";
import { auth } from "@/server/auth";

const TwoFactor = async () => {
  const session = await auth();

  return (
    <SettingsCard>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Two Factor Authentication</p>
        {session?.user.isTwoFactorEnabled ? (
          <Button
            className="bg-green-600 text-white hover:bg-green-400"
            size={"sm"}
          >
            <Check />
            On
          </Button>
        ) : (
          <Button
            className="bg-red-600 text-white hover:bg-red-400"
            size={"sm"}
          >
            <X />
            Off
          </Button>
        )}
      </div>
    </SettingsCard>
  );
};

export default TwoFactor;
