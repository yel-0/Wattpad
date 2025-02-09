export default async function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow rounded-lg">Stats 1</div>
        <div className="p-4 bg-white shadow rounded-lg">Stats 2</div>
        <div className="p-4 bg-white shadow rounded-lg">Stats 3</div>
      </div>
    </div>
  );
}
