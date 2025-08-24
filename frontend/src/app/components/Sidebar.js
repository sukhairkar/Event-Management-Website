// components/Sidebar.js

import { FaThLarge, FaRegCalendarAlt, FaFileAlt, FaInbox, FaChartBar, FaCoins, FaImage, FaCommentDots, FaSignOutAlt } from "react-icons/fa";

const menu = [
  { label: 'Dashboard', icon: <FaThLarge />, href: '/dashboard' },
  { label: 'Bookings', icon: <FaRegCalendarAlt />, href: '/bookings' },
  { label: 'Invoices', icon: <FaFileAlt />, href: '/invoices' },
  { label: 'Inbox', icon: <FaInbox />, href: '/inbox' },
  { label: 'Calendar', icon: <FaChartBar />, href: '/calendar' },
  { label: 'Events', icon: <FaRegCalendarAlt />, href: '/events' },
  { label: 'Financials', icon: <FaCoins />, href: '/financials' },
  { label: 'Gallery', icon: <FaImage />, href: '/gallery' },
  { label: 'Feedback', icon: <FaCommentDots />, href: '/feedback' },
];

export default function Sidebar() {
  return (
    <aside className="min-h-screen bg-[#f8f9ff] w-64 flex flex-col px-4 py-6 border-r relative">
      {/* Logo & App Name */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-[#e9eafe] rounded-lg flex items-center justify-center text-xl text-[#9650fa] font-bold">V</div>
        <span className="font-semibold text-xl text-[#323060]">Ventixe</span>
      </div>
      {/* Menu */}
      <nav className="flex-1">
        <ul>
          {menu.map(item => (
            <li key={item.label} className="mb-2">
              <a href={item.href} className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#6366f1] hover:bg-[#f2edfd] transition font-medium">
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* Upgrade Card */}
      <div className="mt-auto mb-6 p-3 bg-[#e6e6fa] rounded-lg flex flex-col items-center text-center">
        <img src="/feature-image.png" alt="Upgrade Features" className="w-12 h-12 mb-2" />
        <span className="text-sm font-medium mb-1">Experience enhanced features with the latest version!</span>
        <button className="bg-[#9650fa] text-white px-3 py-1 rounded-lg text-sm font-semibold mt-2 hover:bg-[#7c41c6] transition">Try New Version</button>
      </div>
      {/* Sign Out */}
      <button className="flex items-center gap-2 bg-[#f5f6fa] px-4 py-2 rounded-lg text-[#6652d8] hover:bg-[#eceaf7] w-full">
        <FaSignOutAlt /> <span>Sign Out</span>
      </button>
    </aside>
  );
}
