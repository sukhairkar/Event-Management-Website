"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-12">
      <Card className="w-full max-w-lg shadow-lg bg-gray-800 border border-purple-700">
        <CardHeader>
          <CardTitle className="text-center text-3xl text-purple-400">
            Admin Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-6">
          <Link href="/app/admin_dashboard/users">
            <Button className="w-full h-20 text-xl rounded-2xl bg-purple-600 hover:bg-purple-700">
              👤 Manage Users
            </Button>
          </Link>
          <Link href="/app/admin_dashboard/events">
            <Button className="w-full h-20 text-xl rounded-2xl bg-purple-600 hover:bg-purple-700">
              📅 Pending Events
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
