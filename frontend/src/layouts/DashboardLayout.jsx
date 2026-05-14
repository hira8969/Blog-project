import { BarChart3, Bookmark, FileText, Home, MessageCircle, PenLine, Settings, Shield, Users } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import Particles from "../components/Particles.jsx";

export default function DashboardLayout({ admin = false }) {
  const items = admin
    ? [["Analytics", "/admin", BarChart3], ["Users", "/admin/users", Users], ["Blogs", "/admin/blogs", FileText], ["Comments", "/admin/comments", MessageCircle], ["Site", "/", Home]]
    : [["Overview", "/dashboard", BarChart3], ["Create", "/dashboard/create", PenLine], ["My Blogs", "/dashboard/my-blogs", FileText], ["Saved", "/dashboard/saved", Bookmark], ["Comments", "/dashboard/comments", MessageCircle], ["Settings", "/dashboard/settings", Settings], ["Site", "/", Home]];
  return (
    <div className="min-h-screen">
      <Particles />
      <aside className="fixed bottom-4 left-4 right-4 z-40 glass rounded-[1.5rem] p-2 lg:bottom-auto lg:right-auto lg:top-4 lg:h-[calc(100vh-2rem)] lg:w-72 lg:rounded-[2rem] lg:p-5">
        <div className="mb-6 hidden items-center gap-3 lg:flex">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-aura to-mint text-white"><Shield size={20} /></span>
          <div>
            <p className="font-black">{admin ? "Admin Studio" : "Creator Studio"}</p>
            <p className="text-xs text-slate-500">Write, moderate, grow</p>
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto lg:grid lg:overflow-visible">
          {items.map(([label, href, Icon]) => (
            <NavLink key={href} to={href} end={href === "/dashboard" || href === "/admin"} className={({ isActive }) => `flex min-w-fit items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "hover:bg-white/50 dark:hover:bg-white/10"}`}>
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="px-4 pb-28 pt-6 lg:ml-80 lg:pb-10">
        <Outlet />
      </main>
    </div>
  );
}
