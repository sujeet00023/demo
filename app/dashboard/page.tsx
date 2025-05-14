// pages/admin/Dashboard.tsx
import Navbar from "../components/navbar";
function Dashboard() {
  return (
    <div className="flex h-screen w-full">
      <Navbar 
      userPermissions={[]} 
      userRole={"admin"} />
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard</h1>
        <p className="text-gray-700">This is where you can manage everything.</p>

        {/* Add additional dashboard widgets/stats here */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold text-lg">Total Clients</h2>
            <p className="text-2xl mt-2">102</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold text-lg">Pending Tasks</h2>
            <p className="text-2xl mt-2">18</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold text-lg">Invoices Sent</h2>
            <p className="text-2xl mt-2">245</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
