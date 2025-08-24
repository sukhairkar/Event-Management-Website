// components/UpcomingEvent.js
export default function UpcomingEvent() {
  return (
    <div className="bg-white rounded-xl shadow p-5 mb-8">
      <div className="font-semibold text-[#9650fa] mb-1">Upcoming Event</div>
      <img src="/concert.jpg" alt="Event" className="w-full h-24 object-cover rounded mb-3" />
      <div className="font-bold">Rhythm & Beats Music Festival</div>
      <div className="text-xs text-gray-500 mb-2">Sunset Park, Los Angeles, CA</div>
      <span className="text-xs bg-[#fbeaf7] text-[#9650fa] rounded px-2 py-0.5">Music</span>
      <div className="mt-2 text-sm text-gray-600">Apr 20, 2029 • 6:00 PM - 11:00 PM</div>
      <button className="mt-3 w-full bg-[#9650fa] text-white py-2 rounded font-semibold hover:bg-[#7c41c6]">View Details</button>
    </div>
  );
}
