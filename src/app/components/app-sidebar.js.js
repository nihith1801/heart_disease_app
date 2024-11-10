import { useSidebar } from "./sidebar-provider";
import { Calendar, Home, Inbox, Search, Settings, ArrowLeft } from "lucide-react";

const menuItems = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export const AppSidebar = () => {
  const { open, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 p-6 transition-transform duration-300 z-20
      bg-[var(--sidebar-background)] bg-opacity-70 backdrop-blur-md
      rounded-lg shadow-lg
      ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Back arrow (only shown when the sidebar is open) */}
      {open && (
        <button
          onClick={toggleSidebar}
          className="flex items-center mb-8 text-white"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="ml-2">Back</span>
        </button>
      )}

      {/* Sidebar Menu */}
      <nav className="mt-4 space-y-4">
        {menuItems.map((item) => (
          <a
            key={item.title}
            href={item.url}
            className="flex items-center space-x-2 text-white"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};
