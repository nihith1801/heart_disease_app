import { useSidebar } from "./sidebar-provider";
import { Menu } from "lucide-react"; // Using Lucide icons

export const SidebarTrigger = () => {
  const { open, toggleSidebar } = useSidebar();

  return (
    // Sidebar trigger button
    !open && (
      <button
        onClick={toggleSidebar}
        className="p-2 text-gray-800 dark:text-gray-200 fixed top-4 left-4 z-30" // Add position and z-index
      >
        <Menu className="w-6 h-6" />
      </button>
    )
  );
};
