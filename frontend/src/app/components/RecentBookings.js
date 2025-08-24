// components/RecentBookings.js
const bookings = [
  { id: 'INV10011', date: '2029/02/26', name: 'Jackson Moore', event: 'Symphony Under the Stars', category: 'Music', tickets: 2, amount: '$100', status: 'Confirmed' },
  { id: 'INV10012', date: '2029/02/24', name: 'Alicia Smithson', event: 'Runway Fashion 2024', category: 'Fashion', tickets: 3, amount: '$60', status: 'Pending' },
  { id: 'INV10013', date: '2029/02/17', name: 'Marcus Ruweiss', event: 'Global Wellness Summit', category: 'Health', tickets: 4, amount: '$240', status: 'Confirmed' },
  { id: 'INV10014', date: '2029/02/12', name: 'Patrick Cooper', event: 'Champions League Screening Night', category: 'Sport', tickets: 1, amount: '$30', status: 'Cancelled' },
  { id: 'INV10015', date: '2029/02/18', name: 'Giida Ramos', event: 'Artistry Unveiled: Modern Art Expo', category: 'Art & Design', tickets: 2, amount: '$110', status: 'Confirmed' },
];

export default function RecentBookings() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4">
      <div className="font-semibold mb-2">Recent Bookings</div>
      <table className="w-full text-sm border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-500">
            <th>Invoice ID</th>
            <th>Date</th>
            <th>Name</th>
            <th>Event</th>
            <th>Tickets</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id} className="bg-[#f8f9ff] rounded">
              <td>{b.id}</td>
              <td>{b.date}</td>
              <td>{b.name}</td>
              <td>{b.event}</td>
              <td>{b.tickets}</td>
              <td>{b.amount}</td>
              <td>
                <span className={`px-2 py-0.5 rounded font-medium text-xs ${
                  b.status==='Confirmed' ? 'bg-green-100 text-green-700'
                  : b.status==='Pending' ? 'bg-yellow-100 text-yellow-700'
                  : b.status==='Cancelled' ? 'bg-red-100 text-red-600'
                  : 'bg-gray-200 text-gray-700'
                }`}>{b.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
