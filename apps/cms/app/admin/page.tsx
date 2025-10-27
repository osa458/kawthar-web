export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Kawthar CMS Admin
            </h1>
            <p className="text-gray-600 mb-8">
              Welcome to the Kawthar Content Management System. This is a simple admin interface.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                <p className="text-gray-600 mb-4">Manage user accounts and permissions</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Manage Users
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Events</h2>
                <p className="text-gray-600 mb-4">Create and manage events</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Manage Events
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Merchants</h2>
                <p className="text-gray-600 mb-4">Manage merchant accounts</p>
                <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                  Manage Merchants
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
