import { Session } from "next-auth";
import SettingsCard from "./settings-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserRoundPen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProfileCardProps = {
  session: Session;
};

const ProfileCard = ({ session }: ProfileCardProps) => {
  console.log(session);

  return (
    <SettingsCard>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src={session?.user?.image!} alt="profile" />
            <AvatarFallback className="bg-primary text-white font-medium">
              {session?.user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{session?.user?.name}</h2>
            <p className="text-sm font-medium text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <UserRoundPen className="w-5 h-5 text-muted-foreground hover:text-black cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </SettingsCard>
  );
};

export default ProfileCard;
