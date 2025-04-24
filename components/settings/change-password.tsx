import { KeyRound } from "lucide-react";
import SettingsCard from "./settings-card";

const ChangePassword = () => {
  return (
    <SettingsCard>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Change Password</p>
        <KeyRound className="w-5 h-5" />
      </div>
    </SettingsCard>
  );
};

export default ChangePassword;
