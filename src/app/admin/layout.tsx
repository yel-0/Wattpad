"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "../components/Admin/AdminSideBar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="w-full flex flex-col">
          {/* Navbar */}
          <header className="bg-white shadow p-4 flex items-center justify-between">
            <SidebarTrigger />
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          </header>

          {/* Page Content */}
          <main className="p-6 w-full ">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
