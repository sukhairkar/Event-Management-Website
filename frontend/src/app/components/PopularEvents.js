// components/PopularEvents.js
export default function PopularEvents() {
  const data = [
    { label: 'Music', value: 40, count: 20000, color: 'bg-[#b17cf7]' },
    { label: 'Sports', value: 35, count: 17500, color: 'bg-[#fa57b6]' },
    { label: 'Fashion', value: 16, count: 12500, color: 'bg-[#84dbfa]' },
  ];
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4">
      <div className="font-semibold mb-2">Popular Events</div>
      {data.map(e => (
        <div key={e.label} className="mb-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{e.label}</span>
            <span className="text-xs text-gray-500">{e.count}</span>
          </div>
          <div className="w-full h-2 rounded bg-gray-200 mt-1">
            <div className={`${e.color} h-2 rounded`} style={{ width: `${e.value}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
