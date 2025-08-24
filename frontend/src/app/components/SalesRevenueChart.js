// components/SalesRevenueChart.js
export default function SalesRevenueChart() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Total Revenue</span>
        <span className="font-bold text-xl text-[#9650fa]">$348,805</span>
      </div>
      {/* Replace with real chart as needed */}
      <div className="h-32 w-full flex items-end gap-2">
        {[40, 52, 35, 60, 48, 33, 45, 54].map((h, idx) => (
          <div key={idx} className="bg-[#d8c5f3] w-8 rounded-md" style={{ height: h + 30 }}>
            <div className="bg-[#9650fa] w-full h-2 rounded-t"></div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'].map(m => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}
