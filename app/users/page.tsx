"use client";
import { motion } from "framer-motion";

const mockUsers = [
  { id: 1, name: "Zeenat Yameen", email: "zeenat.yameen@hecto.com", role: "Admin", status: "Active" },
  { id: 2, name: "John Doe", email: "john.doe@hecto.com", role: "User", status: "Inactive" },
  { id: 3, name: "Emily Carter", email: "emily.carter@hecto.com", role: "Manager", status: "Active" },
  { id: 4, name: "Liam Smith", email: "liam.smith@hecto.com", role: "Moderator", status: "Pending" },
  { id: 5, name: "Olivia Brown", email: "olivia.brown@hecto.com", role: "User", status: "Active" },
];

export default function Users() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-violet-700">User Management</h2>
      <p className="text-lg text-amber-600">Manage user accounts, roles, and permissions effectively.</p>

      {/* User Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-violet-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-violet-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockUsers.map((user) => (
              <motion.tr
                key={user.id}
                whileHover={{ scale: 1.02 }}
                className="hover:bg-violet-50 transition duration-300"
              >
                <td className="px-4 py-3 whitespace-nowrap font-bold text-gray-800">{user.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-900">{user.email}</td>
                <td className="px-4 py-3 whitespace-nowrap text-pink-600 font-semibold">{user.role}</td>
                <td
                  className={`px-4 py-3 whitespace-nowrap font-medium ${
                    user.status === "Active"
                      ? "text-green-700"
                      : user.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {user.status}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                    Edit
                  </button>
                  <button className="ml-2 px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200">
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
