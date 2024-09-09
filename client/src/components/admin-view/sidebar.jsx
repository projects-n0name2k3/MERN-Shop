import {
  BadgeCheck,
  Box,
  ChartNoAxesCombined,
  LayoutDashboard,
} from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IoBagCheckOutline } from "react-icons/io5";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Box />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <IoBagCheckOutline size={24} />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const path = useLocation();
  const [active, setActive] = useState(
    path.pathname.split("/")[2] || "dashboard"
  );
  return (
    <nav className="mt-8 flex-col flex gap-4">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setActive(menuItem.id);
            setOpen ? setOpen(false) : null;
          }}
          className={`flex ${
            active === menuItem.label.toLowerCase() && "bg-black text-white"
          } cursor-pointer text-base font-semibold items-center gap-4 rounded-md px-3 py-2 text-muted-foreground `}
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}
function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">n0name2k3</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">n0name2k3</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
}

export default Sidebar;
