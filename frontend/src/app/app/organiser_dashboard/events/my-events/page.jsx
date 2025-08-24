"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnnouncementsSection from "./AnnouncementsSection";
import { API_URL } from "@/lib/apiurl";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeEvent, setActiveEvent] = useState(null);

  // <-- Hardcode your organiser UUID here (from Supabase created_by column)
  const organiserId = "120ca15e-9e8a-418c-a6af-2155f76960ad";

  useEffect(() => {
    fetch(`${API_URL}/organiser/events`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched events:", data);

        if (Array.isArray(data)) {
          // Filter events for this organiser only
          const userEvents = data.filter(event => event.created_by === organiserId);
          setEvents(userEvents);
        } else {
          console.warn("Unexpected response:", data);
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6 text-purple-400">Dashboard</h2>
        <nav className="space-y-3">
          <a href="/app/organiser_dashboard" className="block py-2 px-4 rounded-lg hover:bg-gray-700">
            Overview
          </a>
          <a href="/app/organiser_dashboard/events/create" className="block py-2 px-4 rounded-lg hover:bg-gray-700">
            Create Event
          </a>
          <a href="/app/organiser_dashboard/events/my-events" className="block py-2 px-4 rounded-lg bg-gray-700">
            My Events
          </a>
          <a href="/app/organiser_dashboard/settings" className="block py-2 px-4 rounded-lg hover:bg-gray-700">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-purple-400">My Events</h1>

          {loading ? (
            <p className="text-gray-400">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-gray-400">No events created yet.</p>
          ) : (
            <ul className="space-y-6">
              {events.map((event) => (
                <li key={event.id}>
                  <div className="border border-gray-700 p-4 rounded-lg shadow-sm flex justify-between items-center bg-gray-800">
                    <div>
                      <h3 className="text-lg font-semibold">{event.name}</h3>
                      <p className="text-sm text-gray-400">{event.description}</p>
                      <p className="text-xs text-gray-500">
                        Type: {event.event_type} | Virtual: {event.is_virtual ? "Yes" : "No"} | Tickets: {event.ticket_stock}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/app/organiser_dashboard/events/edit/${event.id}`}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow transition"
                      >
                        Edit
                      </Link>

                      {/* Announcements Button */}
                      <button
                        onClick={() =>
                          setActiveEvent(activeEvent === event.id ? null : event.id)
                        }
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
                      >
                        Announcements
                      </button>
                    </div>
                  </div>

                  {/* Announcements Section */}
                  {activeEvent === event.id && (
                    <AnnouncementsSection
                      eventId={event.id}
                      organiserId={organiserId} // Use hardcoded organiser UUID
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
