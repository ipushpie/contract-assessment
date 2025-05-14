"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  Home,
  FileText,
  BarChart,
  Users,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <DashboardHeader toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative top-0 left-0 z-30 w-64 h-screen md:h-[calc(100vh-60px)] transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 mt-[60px] md:mt-0`}
        >
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto py-4 px-3">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center p-2 text-base font-normal text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Home className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <span className="ml-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/contracts"
                    className="flex items-center p-2 text-base font-normal text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <FileText className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <span className="ml-3">Contracts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/assessments"
                    className="flex items-center p-2 text-base font-normal text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <BarChart className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <span className="ml-3">Assessments</span>
                  </Link>
                </li>
                {user?.role === "ADMIN" && (
                  <li>
                    <Link
                      href="/dashboard/users"
                      className="flex items-center p-2 text-base font-normal text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Users className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                      <span className="ml-3">Users</span>
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center p-2 text-base font-normal text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Settings className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <span className="ml-3">Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="p-4 md:p-8">{children}</main>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
