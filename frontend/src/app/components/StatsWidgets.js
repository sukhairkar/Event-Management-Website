// components/StatsWidgets.js
import { FaCalendarAlt, FaClipboardList, FaTicketAlt } from 'react-icons/fa';

const widgets = [
  { label: 'Upcoming Events', value: 345, icon: <FaCalendarAlt /> },
  { label: 'Total Bookings', value: 1798, icon: <FaClipboardList /> },
  { label: 'Tickets Sold', value: 1250, icon: <FaTicketAlt /> },
];

export default function StatsWidgets() {
  return (
    <div className="flex gap-6 mb-4">
      {widgets.map((w) => (
        <div key={w.label} className="flex items-center bg-white rounded-xl shadow px-6 py-4 min-w-[180px] gap-3">
          <div className="bg-[#eceafd] p-2 rounded text-[#9650fa] text-xl">{w.icon}</div>
          <div>
            <div className="font-bold text-lg text-gray-800">{w.value}</div>
            <div className="text-sm text-gray-500">{w.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
