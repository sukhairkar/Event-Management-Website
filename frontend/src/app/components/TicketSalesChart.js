// components/TicketSalesChart.js
export default function TicketSalesChart() {
  // Simplified: Use images/svg in place of chart, or use chart lib for real chart.
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center mb-4">
      <div className="font-semibold mb-2">Ticket Sales</div>
      {/* Replace below with a chart lib for donut, or use SVG as placeholder */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg viewBox="0 0 80 80" width={96} height={96} className="mb-3">
          <circle cx="40" cy="40" r="36" fill="#eceafd" />
          <path d="M40 4 a36 36 0 1 1 -25.4558 61.4558" stroke="#9650fa" strokeWidth="8" fill="none"/>
        </svg>
        <span className="absolute font-bold text-lg">2,780</span>
      </div>
      <div className="flex gap-4 mt-2">
        <div className="text-sm text-gray-600 flex flex-col items-center">
          <span className="font-bold">Sold Out</span>
          <span className="text-[#9650fa]">1,251</span>
          <span className="text-xs">45%</span>
        </div>
        <div className="text-sm text-gray-600 flex flex-col items-center">
          <span className="font-bold">Fully Booked</span>
          <span>834</span>
          <span className="text-xs">30%</span>
        </div>
        <div className="text-sm text-gray-600 flex flex-col items-center">
          <span className="font-bold">Available</span>
          <span>695</span>
          <span className="text-xs">25%</span>
        </div>
      </div>
    </div>
  );
}
