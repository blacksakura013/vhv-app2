// src/layout/MainLayout.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

export default function MainLayout({ children }: any) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-blue-50">

      {/* Sidebar */}
      <div className={`
        fixed z-40 top-0 left-0 h-full w-64 bg-white shadow-lg p-4
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        transition-transform
        md:translate-x-0 md:static
      `}>
        <h2 className="text-blue-600 font-bold text-xl mb-6">CVD App</h2>

        <nav className="space-y-3">
          <Link to="/dashboard">Dashboard</Link><br/>
          <Link to="/patient">Patient</Link>
        </nav>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="mt-6 text-red-500"
        >
          Logout
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 shadow flex justify-between">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            ☰
          </button>
          <h1 className="text-blue-600 font-bold">ระบบคัดกรอง</h1>
        </div>

        <div className="p-4 overflow-auto">{children}</div>
      </div>
    </div>
  );
}