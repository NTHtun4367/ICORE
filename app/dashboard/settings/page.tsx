import ChangePassword from "@/components/settings/change-password";
import LogoutBtn from "@/components/settings/logout";
import ProfileCard from "@/components/settings/profile-card";
import SettingsCard from "@/components/settings/settings-card";
import TwoFactor from "@/components/settings/two-factor";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const Settings = async () => {
  const session = await auth();

  if (!session?.user) return redirect("/");

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      <SettingsCard title="Settings" description="Manage your account settings">
        <main className="flex flex-1 flex-col lg:flex-row gap-4 pt-4">
          <div className="space-y-4 flex-1">
            <ProfileCard session={session} />
            {!session.user.isOauth && (
              <ChangePassword email={session.user.email!} />
            )}
          </div>
          <div className="space-y-4 flex-1">
            {!session.user.isOauth && (
              <TwoFactor
                isTwoFactorEnabled={session.user.isTwoFactorEnabled}
                email={session.user.email!}
              />
            )}
            <LogoutBtn />
          </div>
        </main>
      </SettingsCard>
    </>
  );
};

export default Settings;
