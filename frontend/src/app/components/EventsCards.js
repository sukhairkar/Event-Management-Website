// components/EventsCards.js
const events = [
  { category: 'Sport', title: 'Champions League Screening Night', location: 'Toronto, ON', date: 'Apr 20, 2029', price: '$30', img: '/event-sport.jpg' },
  { category: 'Food & Culinary', title: 'Culinary Delights Festival', location: 'San Francisco, CA', date: 'Mar 3, 2029', price: '$40', img: '/event-food.jpg' },
  { category: 'Fashion', title: 'Artistry Unveiled: Modern Art Expo', location: 'Los Angeles, CA', date: 'Mar 10, 2029', price: '$110', img: '/event-art.jpg' },
];

export default function EventsCards() {
  return (
    <div className="flex gap-6 mb-8">
      {events.map(ev => (
        <div key={ev.title} className="bg-white rounded-xl shadow overflow-hidden w-[250px]">
          <img src={ev.img} alt={ev.title} className="w-full h-24 object-cover" />
          <div className="p-4">
            <span className="text-xs bg-[#eceafd] text-[#9650fa] rounded px-2 py-0.5 mb-1 inline-block">{ev.category}</span>
            <div className="font-bold text-md mt-1">{ev.title}</div>
            <div className="text-xs text-gray-500">{ev.location}</div>
            <div className="mt-2 text-[#9650fa] font-bold">{ev.price}</div>
            <div className="text-xs text-gray-400">{ev.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
