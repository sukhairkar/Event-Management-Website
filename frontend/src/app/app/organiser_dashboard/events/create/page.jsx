"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // ✅ Import router

export default function OrganiserDashboard() {
  const { user } = useUser();
  const router = useRouter(); // ✅ Init router

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date_start: "",
    date_end: "",
    location: "",
    event_type: "hackathon",
    ticket_stock: 100,
    price_from: "",
    banner_url: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/organiser/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerk_id: user.id,
          ...eventData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Event created successfully!");
        console.log("Created Event:", data);

        // ✅ Redirect to dashboard
        router.push("/app/organiser_dashboard");

        setEventData({
          name: "",
          description: "",
          date_start: "",
          date_end: "",
          location: "",
          event_type: "hackathon",
          ticket_stock: 100,
          price_from: "",
          banner_url: "",
        });
      } else {
        alert("❌ Failed to create event: " + data.error);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("⚠️ Something went wrong. Check console.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-gray-900 shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-purple-400 mb-8">Organiser</h2>
        <nav className="space-y-4">
          <button
            onClick={() => router.push("/app/organiser_dashboard")}
            className="block w-full text-left px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 transition"
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => router.push("/app/organiser_dashboard/events/create")}
            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-purple-600 transition"
          >
            🎉 Create Event
          </button>
          <button
            onClick={() => router.push("/app/organiser_dashboard/events/my-events")}
            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-purple-600 transition"
          >
            📁 My Events
          </button>
          <button
            onClick={() => router.push("/app/organiser_dashboard/settings")}
            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-purple-600 transition"
          >
            ⚙️ Settings
          </button>
        </nav>
        <div className="mt-auto">
          <button
            onClick={() => router.push("/")}
            className="block w-full text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-10">
        <div className="max-w-3xl mx-auto bg-gray-900 shadow-xl rounded-2xl p-8 border border-purple-500">
          <h1 className="text-3xl font-extrabold mb-6 text-center text-purple-400">
            Create New Event
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Event Name */}
            <div>
              <label className="block text-purple-300 font-medium mb-2">
                Event Name
              </label>
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleChange}
                placeholder="Enter event name"
                className="w-full px-4 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-400 bg-black text-white placeholder-purple-400"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-purple-300 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
                placeholder="Enter event description"
                rows="4"
                className="w-full px-4 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-400 bg-black text-white placeholder-purple-400"
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-300 font-medium mb-2">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  name="date_start"
                  value={eventData.date_start}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-400 bg-black text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-300 font-medium mb-2">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  name="date_end"
                  value={eventData.date_end}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-400 bg-black text-white"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-purple-300 font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="w-full px-4 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-400 bg-black text-white placeholder-purple-400"
                required
              />
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-purple-300 font-medium mb-2">
                Event Type
              </label>
              <select
                name="event_type"
                value={eventData.event_type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-400 bg-black text-white"
              >
                <option value="hackathon">Hackathon</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="meetup">Meetup</option>
              </select>
            </div>

            {/* Ticket Stock */}
            <div>
              <label className="block text-purple-300 font-medium mb-2">
                Ticket Stock
              </label>
              <input
                type="number"
                name="ticket_stock"
                value={eventData.ticket_stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-400 bg-black text-white"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-purple-300 font-medium mb-2">
                Starting Price
              </label>
              <input
                type="number"
                step="0.01"
                name="price_from"
                value={eventData.price_from}
                onChange={handleChange}
                placeholder="Enter minimum price"
                className="w-full px-4 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-400 bg-black text-white placeholder-purple-400"
              />
            </div>

            {/* Banner URL */}
            <div>
              <label className="block text-purple-300 font-medium mb-2">
                Banner URL
              </label>
              <input
                type="url"
                name="banner_url"
                value={eventData.banner_url}
                onChange={handleChange}
                placeholder="https://example.com/banner.png"
                className="w-full px-4 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-400 bg-black text-white placeholder-purple-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-600 transition font-semibold shadow-md"
            >
              🚀 Create Event
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
