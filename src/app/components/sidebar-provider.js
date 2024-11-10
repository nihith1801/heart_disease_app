"use client";
import { createContext, useState, useContext } from "react";

const SidebarContext = createContext({
  open: false,
  toggleSidebar: () => {},
});

export const SidebarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ open, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
