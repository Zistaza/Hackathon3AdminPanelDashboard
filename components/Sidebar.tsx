"use client";
import Link from "next/link";
import { DollarSign, LayoutDashboard, Package, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/", icon: <LayoutDashboard size={20} /> },
  { name: "Products", href: "/products", icon: <Package size={20} /> },
  { name: "Orders", href: "/orders", icon: <ShoppingCart size={20} /> },
  { name: "Revenue", href: "/revenue", icon: <DollarSign size={20} /> },
];


export default function Sidebar() {
  const pathname = usePathname(); // To highlight active link

  return (
    <aside className="w-64 h-screen bg-slate-600 text-white p-4 transition-all duration-300 ease-in-out">
      <h1 className="text-2xl font-bold mb-8 text-white">Hecto Admin</h1>

      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${
              pathname === item.href
                ? "bg-white text-violet-600 font-semibold"
                : "hover:bg-violet-500 hover:text-white"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
