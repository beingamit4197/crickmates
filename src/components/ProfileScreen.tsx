import {
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { useFirebaseAuth } from "../providers/FirebaseProvider";
import { auth } from "../lib/firebase";

export default function ProfileScreen() {
  const { user, isLoading } = useFirebaseAuth();

  const displayName =
    user?.displayName ??
    user?.email?.split("@")[0]?.replace(/[^a-zA-Z0-9]/g, " ") ??
    "Guest User";

  const initials =
    user?.displayName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ??
    user?.email?.slice(0, 2).toUpperCase() ??
    "GU";

  const email = user?.email ?? "Not linked";

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white px-6 pt-8 pb-12 rounded-b-3xl">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-green-600 shadow-xl mb-4">
            <span className="text-3xl">
              {isLoading ? "…" : initials}
            </span>
          </div>
          <h2 className="text-xl mb-1">{isLoading ? "Loading…" : displayName}</h2>
          <p className="text-green-100 text-sm mb-4">
            {user ? "Signed in with Firebase" : "Create an account to unlock syncing"}
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="bg-white/20 border-white/40 text-white hover:bg-white/30">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 -mt-8">
        <Card className="p-4 mb-6 shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail size={18} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Email</p>
                <p className="text-sm">{email}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone size={18} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Phone</p>
                <p className="text-sm text-gray-400">
                  {user?.phoneNumber ?? "Add a phone number in your Firebase account"}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield size={18} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600">Member Since</p>
                <p className="text-sm text-gray-400">
                  {user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : "Create an account to track your activity"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 text-center">
            <p className="text-xl mb-1">3</p>
            <p className="text-xs text-gray-600">Teams</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-xl mb-1">44</p>
            <p className="text-xs text-gray-600">Matches</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-xl mb-1">31</p>
            <p className="text-xs text-gray-600">Wins</p>
          </Card>
        </div>

        {/* Settings */}
        <Card className="p-4 mb-4">
          <h3 className="text-sm mb-3">Settings</h3>
          <div className="space-y-3">
            <SettingItem
              icon={<Bell size={18} />}
              label="Push Notifications"
              rightElement={<Switch defaultChecked />}
            />
            <Separator />
            <SettingItem
              icon={<Bell size={18} />}
              label="Match Reminders"
              rightElement={<Switch defaultChecked />}
            />
            <Separator />
            <SettingItem
              icon={<Shield size={18} />}
              label="Privacy & Security"
              rightElement={<ChevronRight size={18} className="text-gray-400" />}
              onClick={() => {}}
            />
          </div>
        </Card>

        {/* Menu Items */}
        <Card className="p-4 mb-4">
          <div className="space-y-3">
            <MenuItem
              icon={<Settings size={18} />}
              label="App Settings"
              onClick={() => {}}
            />
            <Separator />
            <MenuItem
              icon={<HelpCircle size={18} />}
              label="Help & Support"
              onClick={() => {}}
            />
            <Separator />
            <MenuItem
              icon={<Shield size={18} />}
              label="Terms & Privacy"
              onClick={() => {}}
            />
          </div>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-red-600 border-red-200 hover:bg-red-50 disabled:opacity-50"
          onClick={handleLogout}
          disabled={!user}
        >
          <LogOut size={18} className="mr-2" />
          {user ? "Logout" : "Not signed in"}
        </Button>
      </div>
    </div>
  );
}

function SettingItem({ icon, label, rightElement, onClick }: any) {
  return (
    <div 
      className="flex items-center justify-between cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-600">{icon}</div>
        <span className="text-sm">{label}</span>
      </div>
      {rightElement}
    </div>
  );
}

function MenuItem({ icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full text-left hover:bg-gray-50 -mx-2 px-2 py-1 rounded"
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-600">{icon}</div>
        <span className="text-sm">{label}</span>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );
}
