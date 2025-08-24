"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const { user } = useUser();
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const fetchPendingEvents = async () => {
    setLoadingEvents(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/events/pending");
      const data = await res.json();
      setPendingEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch pending events:", err);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const handleApprove = async (eventId) => {
    await fetch("http://localhost:5000/api/admin/events/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventId }),
    });
    fetchPendingEvents();
  };

  const handleReject = async (eventId) => {
    await fetch("http://localhost:5000/api/admin/events/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventId }),
    });
    fetchPendingEvents();
  };

  if (!user) return <p className="text-purple-300">Loading...</p>;
  if (user.publicMetadata.role !== "admin")
    return <p className="text-red-600">Access denied</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Pending Events</h1>
      {loadingEvents ? (
        <p className="text-purple-300">Loading...</p>
      ) : pendingEvents.length === 0 ? (
        <p className="text-purple-300">No pending events</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {pendingEvents.map((event) => (
            <Card key={event.id} className="bg-gray-800 border border-purple-700">
              <CardHeader>
                <CardTitle className="text-purple-400">{event.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <p>{event.description}</p>
                <p className="text-sm text-purple-300 mt-2">
                  <strong>Type:</strong> {event.event_type} |{" "}
                  <strong>Virtual:</strong> {event.is_virtual ? "Yes" : "No"} |{" "}
                  <strong>Status:</strong> {event.status}
                </p>
                <div className="mt-4 flex space-x-2">
                  <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => handleApprove(event.id)}>
                    Approve
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleReject(event.id)}>
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
