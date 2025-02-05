"use client";

import { getProducts } from "@/lib/getProducts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

// ✅ Product Interface
interface Product {
  _id: string;
  name: string;
  price: number;
  stockLevel: number;
  imageUrl: string;
}

export default function Products() {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // ✅ Mutation for deleting a product with proper typing
  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // ✅ Correct usage
      toast.success("Product deleted successfully!");
    },
    onError: () => {
      toast.error("Error deleting product.");
    },
  });

  // ✅ Explicitly type the ID as a string
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct.mutate(id);
    }
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products</p>;

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <motion.h2
          className="text-3xl font-bold text-violet-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Products
        </motion.h2>
        <button className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <table className="min-w-full bg-white rounded shadow-md">
        <thead>
          <tr className="bg-violet-400 text-pink-600">
            <th className="p-4">Image</th>
            <th className="p-4">Product Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product._id} className="border-t hover:bg-rose-200 transition">
              <td className="p-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-4 font-semibold text-violet-900">{product.name}</td>
              <td className="p-4 text-blue-900 font-bold">${product.price}</td>
              <td className="p-4 text-amber-700 font-bold">{product.stockLevel}</td>
              <td className="p-4 flex gap-3">
                <button className="text-green-600 hover:text-green-800 flex items-center gap-1">
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
