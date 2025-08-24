"use client";
import React from 'react'
import { withAuth } from "../../lib/withAuth";

const page = () => {
  return (
    <div>
      <text className="text-2xl font-semibold text-zinc-150">Attendee Dashboard</text>
        <p className="text-lg text-gray-700 mt-4">Welcome to your dashboard! Here you can manage your events, view tickets, and more.</p>
    </div>
  )
}

export default withAuth(page,["attendee"]);
