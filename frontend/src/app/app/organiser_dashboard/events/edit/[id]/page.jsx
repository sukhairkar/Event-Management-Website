"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditEvent() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/organiser/events/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:5000/api/organiser/events/edit/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      alert("✅ Event updated successfully!");
      router.push("/app/organiser_dashboard/events/my-events");
    } else {
      alert("❌ Failed to update event");
    }
  };

  if (!form)
    return <p className="text-center mt-10 text-gray-300">No Events Found</p>;

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6 text-purple-400">Dashboard</h2>
        <nav className="space-y-3">
          <a
            href="/app/organiser_dashboard"
            className="block py-2 px-4 rounded-lg hover:bg-gray-700"
          >
            Overview
          </a>
          <a
            href="/app/organiser_dashboard/events/create"
            className="block py-2 px-4 rounded-lg hover:bg-gray-700"
          >
            Create Event
          </a>
          <a
            href="/app/organiser_dashboard/events/my-events"
            className="block py-2 px-4 rounded-lg hover:bg-gray-700"
          >
            My Events
          </a>
          <a
            href="/app/organiser_dashboard/settings"
            className="block py-2 px-4 rounded-lg hover:bg-gray-700"
          >
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-purple-400">
            Edit Event
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
              required
            />
            <select
              name="event_type"
              value={form.event_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
            >
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
            </select>
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                name="is_virtual"
                checked={form.is_virtual}
                onChange={handleChange}
              />
              Virtual Event?
            </label>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
