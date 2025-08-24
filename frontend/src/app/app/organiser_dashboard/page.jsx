// src/app/app/organiser_dashboard/page.jsx
"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function OrganiserDashboard() {
  const { user } = useUser();

  if (!user) return <p className="text-center mt-10 text-gray-200">Loading...</p>;
  if (user.publicMetadata.role !== "organiser")
    return <p className="text-center mt-10 text-red-500">Access denied</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-purple-400 mb-6">Organiser</h2>
          <nav className="space-y-4">
            <Link
              href="/app/organiser_dashboard"
              className="block px-4 py-2 rounded-lg hover:bg-purple-700/30 hover:text-purple-300 transition"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/app/organiser_dashboard/events/create"
              className="block px-4 py-2 rounded-lg hover:bg-purple-700/30 hover:text-purple-300 transition"
            >
              ➕ Create Event
            </Link>
            <Link
              href="/app/organiser_dashboard/events/my-events"
              className="block px-4 py-2 rounded-lg hover:bg-purple-700/30 hover:text-purple-300 transition"
            >
              📋 My Events
            </Link>
            <Link
              href="/app/app/organiser_dashboard/settings"
              className="block px-4 py-2 rounded-lg hover:bg-purple-700/30 hover:text-purple-300 transition"
            >
              ⚙️ Edit Event
            </Link>
          </nav>
        </div>

        {/* Clerk User Button */}
        <div className="mt-6 flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <span className="text-sm text-gray-300">{user.fullName || user.username}</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Heading */}
          <h1 className="text-4xl font-extrabold text-center text-purple-400">
            Organiser Dashboard
          </h1>
          <p className="text-center text-gray-400">
            Manage all your events from one place
          </p>

          {/* Event Management Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Create Event */}
            <Link
              href="/app/organiser_dashboard/events/create"
              className="px-6 py-8 rounded-2xl shadow-lg bg-purple-700/30 border border-purple-500 
                       text-center hover:bg-purple-700/50 hover:shadow-purple-600/40 transition"
            >
              <div className="text-purple-300 text-2xl mb-2">➕</div>
              <h2 className="text-lg font-semibold text-purple-300">Create Event</h2>
              <p className="text-gray-400 text-sm">Add a new event to the platform</p>
            </Link>

            {/* My Events */}
            <Link
              href="/app/organiser_dashboard/events/my-events"
              className="px-6 py-8 rounded-2xl shadow-lg bg-purple-700/30 border border-purple-500 
                       text-center hover:bg-purple-700/50 hover:shadow-purple-600/40 transition"
            >
              <div className="text-purple-300 text-2xl mb-2">📋</div>
              <h2 className="text-lg font-semibold text-purple-300">My Events</h2>
              <p className="text-gray-400 text-sm">View and manage your created events</p>
            </Link>

            {/* Edit Event */}
            {/* <Link
              href="/app/organiser_dashboard/events/edit/1" // Example ID
              className="px-6 py-8 rounded-2xl shadow-lg bg-purple-700/30 border border-purple-500 
                       text-center hover:bg-purple-700/50 hover:shadow-purple-600/40 transition"
            >
              <div className="text-purple-300 text-2xl mb-2">✏️</div>
              <h2 className="text-lg font-semibold text-purple-300">Edit Event</h2>
              <p className="text-gray-400 text-sm">Update details of an existing event</p>
            </Link> */}
          </div>
        </div>
      </main>
    </div>
  );
}
