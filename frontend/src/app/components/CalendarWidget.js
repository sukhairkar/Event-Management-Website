// components/CalendarWidget.js
export default function CalendarWidget() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4">
      <div className="font-semibold text-black mb-2">March 2029</div>
      {/* Simplified: Real calendar can use a lib or build an interactive one */}
      <div className="grid grid-cols-7 gap-1 text-xs mb-2">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="text-gray-400">{d}</div>)}
        {/* Populate with days, highlight 13th */}
        {[...Array(31)].map((_, i) =>
          <div key={i} className={`py-1 ${i+1===13?'bg-[#9650fa] text-white font-bold rounded':''}`}>
            {i+1}
          </div>
        )}
      </div>
      {/* Upcoming Items */}
      <div className="mt-3">
        <div className="text-sm font-medium mb-2">Upcoming</div>
        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold">Panel Discussion</div>
          <span className="text-xs text-gray-500">Tech Beyond 2024 • Mar 23</span>
          <div className="text-xs font-semibold">Live Concert</div>
          <span className="text-xs text-gray-500">Ebs Beats Festival • Mar 5</span>
          <div className="text-xs font-semibold">Fashion Showcase</div>
          <span className="text-xs text-gray-500">Spring Trend Runway • Mar 23</span>
        </div>
      </div>
    </div>
  );
}
