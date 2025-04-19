
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  FileBox,
  Globe,
  BarChart2,
  Settings,
  Shield,
  TicketCheck,
  Bell,
  Layout,
  CreditCard
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Site Management", href: "/site-management", icon: FileBox },
  { name: "Domain Management", href: "/domain-management", icon: Globe },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Account Settings", href: "/settings", icon: Settings },
  { name: "Security", href: "/security", icon: Shield },
  { name: "Support", href: "/support", icon: TicketCheck },
  { name: "Templates", href: "/templates", icon: Layout },
  { name: "Billing", href: "/billing", icon: CreditCard },
];

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex-col border-r bg-white transition-all duration-300 ease-in-out",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {expanded ? (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-orange-gradient"></div>
            <span className="text-xl font-bold">EmberHub</span>
          </div>
        ) : (
          <div className="h-8 w-8 mx-auto rounded-full bg-orange-gradient"></div>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded-md p-1.5 hover:bg-secondary transition-colors"
        >
          {expanded ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 6L9 12L15 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-secondary text-primary font-semibold"
                      : "text-gray-600 hover:bg-secondary hover:text-primary"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                      isActive ? "text-primary" : "text-gray-400 group-hover:text-primary"
                    )}
                  />
                  {expanded && (
                    <span className="truncate animate-fade-in">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t p-4">
        {expanded ? (
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400"></span>
            </div>
            <div className="animate-fade-in">
              <div className="font-medium">John Smith</div>
              <div className="text-xs text-gray-500">Pro Plan</div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400"></span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
