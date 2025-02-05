"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Package, ShoppingCart, Users, DollarSign, User } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";



const navItems = [
  { name: "Dashboard", href: "/", icon: <LayoutDashboard size={20} /> },
  { name: "Products", href: "/products", icon: <Package size={20} /> },
  { name: "Orders", href: "/orders", icon: <ShoppingCart size={20} /> },
  { name: "Users", href: "/users", icon: <Users size={20} /> },
  { name: "Revenue", href: "/revenue", icon: <DollarSign size={20} /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  

  

  return (
    <div className="flex min-h-screen bg-white text-violet-800">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed top-0 left-0 w-64 h-full bg-pink-400 shadow-xl transition-transform duration-300 ease-in-out md:relative z-10`}
      >
        <div className="flex justify-between items-center p-8 text-3xl font-bold text-violet-800 hover:text-white transition-colors">
          <span>Hecto Admin</span>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-2xl text-white">✕</button>
        </div>
        <nav className="mt-8">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all duration-200 ease-in-out rounded-md ${
                  pathname === item.href
                    ? "bg-violet-100 text-pink-600 font-semibold"
                    : "text-white hover:bg-purple-300 hover:text-violet-700"
                }`}
              >
                {item.icon}
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center bg-white shadow-md px-6 py-4 transition-all duration-200 ease-in-out">
          <h1 className="text-xl font-semibold text-amber-700">Dashboard</h1>
          <button className="md:hidden text-2xl" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? "✕" : "☰"}
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User size={20} />
              <span className="text-lg text-blue-900 font-bold"></span>
            </div>
            
              <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-all duration-200 ease-in-out">
                <LogOut size={24} />
                Logout
              </button>
            
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 mb-6">
          {[
            { title: "Total Revenue", value: "$15,245", bg: "bg-pink-500", text: "text-white" },
            { title: "Total Orders", value: "345", bg: "bg-amber-500", text: "text-white" },
            { title: "Active Users", value: "120", bg: "bg-blue-400", text: "text-white" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`p-6 rounded-lg shadow-xl flex flex-col items-center justify-center ${stat.bg} ${stat.text}`}
            >
              <h3 className="text-2xl font-semibold">{stat.title}</h3>
              <p className="text-xl mt-2 font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
