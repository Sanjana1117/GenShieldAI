export default function Test() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">GenShield Test Page</h1>
      <p className="text-gray-700 mb-6">This is a simple test page to verify the Next.js server is working properly.</p>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3">Server Status</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-green-700">Server running successfully</span>
        </div>
      </div>
    </div>
  );
}