"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

interface Order {
  id: number;
  customer: string;
  total: string;
  status: string;
  productImage: string;
}

const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch("/api/orders");
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
};

export default function Orders() {
  const queryClient = useQueryClient();
  const { data = [], isLoading, isError, error } = useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const deleteOrder = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete order");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6 bg-violet-50 min-h-screen">
      {/* Animated Heading */}
      <motion.h2
        className="text-3xl font-bold mb-6 text-violet-800"
        initial={{ opacity: 0, y: -20 }}     // Start hidden and slightly above
        animate={{ opacity: 1, y: 0 }}        // Fade in and slide down
        transition={{ duration: 0.6, ease: "easeOut" }}  // Smooth transition
      >
        Orders
      </motion.h2>
      <table className="min-w-full bg-white rounded-xl shadow-md">
        <thead>
          <tr className="bg-violet-300 text-pink-600">
            <th className="p-4">Image</th>
            <th className="p-2">Order ID</th>
            <th className="p-4">Customer Name</th>
            <th className="p-4">Total Amount</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.id} className="border-t hover:bg-rose-200">
              <td className="p-4">
                <Image
                  src={order.productImage}
                  alt={`Order #${order.id}`}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
              </td>
              <td className="p-4 font-bold">#{order.id}</td>
              <td className="p-4 font-bold">{order.customer}</td>
              <td className="p-4 font-bold text-blue-900 text-1xl">{order.total}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-200 text-green-800"
                      : order.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-4 flex gap-3">
                <button
                  className="text-violet-600 hover:text-violet-800"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowModal(true);
                  }}
                >
                  <Eye size={18} />
                </button>
                <button
                  className="text-green-600 hover:text-green-800"
                  onClick={() => alert(`Edit Order #${order.id}`)}
                >
                  <Edit size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => deleteOrder.mutate(order.id)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold text-violet-800 mb-4">Order Details</h3>
            <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Total:</strong> {selectedOrder.total}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <Image
              src={selectedOrder.productImage}
              alt="Product"
              width={100}
              height={100}
              className="mt-2 rounded"
            />
            <button
              className="mt-4 w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}