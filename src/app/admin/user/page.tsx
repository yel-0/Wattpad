export default async function User() {
  // Simulating user data fetching (replace with real API call)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "User",
    joined: "2023-05-10",
    stats: [
      { title: "Orders", value: 12 },
      { title: "Reviews", value: 5 },
      { title: "Wishlist", value: 8 },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {user.stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow rounded-lg text-center"
          >
            <h2 className="text-lg font-semibold">{stat.title}</h2>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
        <ul className="text-gray-600">
          <li>✔ Placed an order on Jan 10, 2024</li>
          <li>⭐ Left a review on a product</li>
          <li>💖 Added an item to the wishlist</li>
        </ul>
      </div>
    </div>
  );
}
