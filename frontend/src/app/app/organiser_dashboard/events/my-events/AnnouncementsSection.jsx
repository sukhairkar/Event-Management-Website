"use client";

import { useState, useEffect } from "react";

export default function AnnouncementsSection({ eventId, organiserId }) {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    if (!eventId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/announcements/${eventId}`);
      const data = await res.json();
      if (data.announcements) setAnnouncements(data.announcements);
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [eventId]);

  // Post new announcement
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message) return alert("Title and message are required");

    try {
      const res = await fetch(`http://localhost:5000/api/announcements/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: eventId,
          organiser_id: organiserId, // must be DB ID
          title,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setTitle("");
        setMessage("");
        fetchAnnouncements(); // refresh
      } else {
        alert(data.error || "Failed to create announcement");
      }
    } catch (err) {
      console.error("Error creating announcement:", err);
    }
  };

  return (
    <div className="mt-4 p-5 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-purple-400 mb-4">Announcements</h3>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Announcement title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <textarea
          placeholder="Announcement message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows={4}
        ></textarea>
        <button
          type="submit"
          className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          Post Announcement
        </button>
      </form>

      {loading ? (
        <p className="text-gray-400">Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p className="text-gray-400">No announcements yet.</p>
      ) : (
        <ul className="space-y-4 max-h-96 overflow-y-auto">
          {announcements.map((a) => (
            <li
              key={a.id}
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow hover:border-purple-500 transition"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-purple-400 font-semibold text-lg">{a.title}</h4>
                <span className="text-gray-500 text-sm">
                  {new Date(a.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-100 mt-2">{a.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
