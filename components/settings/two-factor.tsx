import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import SettingsCard from "./settings-card";

const TwoFactor = () => {
  return (
    <SettingsCard>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Two Factor Authentication</p>
        {true ? (
          <Button className="bg-green-600 text-white hover:bg-green-400" size={"sm"}>
            <Check />
            On
          </Button>
        ) : (
          <Button className="bg-red-600 text-white hover:bg-red-400" size={"sm"}>
            <X />
            Off
          </Button>
        )}
      </div>
    </SettingsCard>
  );
};

export default TwoFactor;
