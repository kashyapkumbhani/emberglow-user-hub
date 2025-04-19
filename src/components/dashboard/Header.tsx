
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
};

const notifications: Notification[] = [
  {
    id: 1,
    title: "Storage Limit 90%",
    description: "You're approaching your storage limit",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    title: "Custom Domain Active",
    description: "yourdomain.com has been activated",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Maintenance Update",
    description: "System maintenance scheduled for tonight",
    time: "Yesterday",
    read: true,
  },
];

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-white px-4 lg:px-6">
      <div className="flex items-center gap-2">
        {isSearchOpen ? (
          <div className="flex animate-fade-in">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[300px] rounded-r-none border-r-0"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
            <Button variant="outline" size="icon" className="rounded-l-none border-l-0">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsSearchOpen(true)}
            className="animate-fade-in"
          >
            <Search className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex cursor-pointer flex-col items-start p-3 ${
                  !notification.read ? "bg-secondary/50" : ""
                }`}
              >
                <div className="flex w-full justify-between">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <span className="text-sm text-gray-600">{notification.description}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center font-medium text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
