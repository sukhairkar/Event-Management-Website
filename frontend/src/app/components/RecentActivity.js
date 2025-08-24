// components/RecentActivity.js
const activities = [
  { time: '02:03 PM', text: 'Admin Stefanus Weber resolved a refund request for Invoice ID: INV10014.' },
  { time: '09:00 AM', text: 'Neil McGrath updated ticket prices for "Runway Fashion 2024" under Fashion.' },
  { time: '11:15 AM', text: 'Patrick Cooper canceled a booking with Invoice ID: INV10014.' },
  { time: '08:35 AM', text: 'Andrew Shaw created a new event: "Symphony Under the Stars" under Music.' },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4">
      <div className="font-semibold mb-2">Recent Activity</div>
      <ul>
        {activities.map((a,i) => (
          <li key={i} className="mb-2 flex gap-3 items-start">
            <span className="text-xs text-gray-400 mt-0.5">{a.time}</span>
            <span className="text-sm text-gray-700">{a.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
