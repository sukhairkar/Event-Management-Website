"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLayout({ children }) {
  const { user } = useUser();

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 flex flex-col justify-between border-r border-purple-700">
        <div>
          <h1 className="text-2xl font-bold px-6 py-4 text-purple-400">
            Admin Panel
          </h1>

          <div className="flex flex-col space-y-2 px-4">
            <Link href="/app/admin_dashboard">
              <Button className="w-full justify-start text-white bg-gray-800 hover:bg-purple-700">
                Dashboard
              </Button>
            </Link>
            <Link href="/app/admin_dashboard/users">
              <Button className="w-full justify-start text-white bg-gray-800 hover:bg-purple-700">
                Manage Users
              </Button>
            </Link>
            <Link href="/app/admin_dashboard/events">
              <Button className="w-full justify-start text-white bg-gray-800 hover:bg-purple-700">
                Pending Events
              </Button>
            </Link>
          </div>
        </div>

        {/* Logged-in user info */}
        <div className="px-6 py-4 border-t border-gray-700">
          {user && (
            <>
              <p className="text-sm font-medium text-purple-300">{user.fullName}</p>
              <p className="text-xs text-gray-400">{user.primaryEmailAddress?.emailAddress}</p>
            </>
          )}
          <div className="mt-2">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
