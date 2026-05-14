import { motion } from "framer-motion";
import { LogOut, Menu, Moon, PenLine, Search, Sun, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice.js";
import { toggleTheme } from "../redux/slices/themeSlice.js";

const navItems = [
  ["Explore", "/explore"],
  ["Trending", "/trending"],
  ["Categories", "/categories"],
  ["About", "/about"]
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = (event) => {
    event.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed left-0 right-0 top-4 z-50 px-4">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-black">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-aura via-coral to-mint text-white shadow-glow">L</span>
          <span>Lumina</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, href]) => (
            <NavLink key={href} to={href} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-bold transition ${isActive ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "hover:bg-white/50 dark:hover:bg-white/10"}`}>
              {label}
            </NavLink>
          ))}
        </div>
        <form onSubmit={search} className="hidden min-w-64 items-center gap-2 rounded-full border border-white/30 bg-white/45 px-3 py-2 backdrop-blur xl:flex dark:bg-slate-950/40">
          <Search size={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search stories" className="w-full bg-transparent text-sm outline-none" />
        </form>
        <div className="hidden items-center gap-2 md:flex">
          <button aria-label="Toggle theme" className="btn-ghost !h-11 !w-11 !p-0" onClick={() => dispatch(toggleTheme())}>{mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
          {user ? (
            <>
              <Link className="btn-ghost" to="/dashboard"><UserRound size={17} />Dashboard</Link>
              <button className="btn-ghost !h-11 !w-11 !p-0" onClick={() => dispatch(logout())} aria-label="Logout"><LogOut size={17} /></button>
            </>
          ) : (
            <>
              <Link className="btn-ghost" to="/login">Login</Link>
              <Link className="btn-primary" to="/register"><PenLine size={17} />Start writing</Link>
            </>
          )}
        </div>
        <button className="btn-ghost !h-11 !w-11 !p-0 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <div className="glass mx-auto mt-3 grid max-w-7xl gap-2 rounded-[1.5rem] p-4 md:hidden">
          {navItems.map(([label, href]) => <Link key={href} to={href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-bold hover:bg-white/50">{label}</Link>)}
          <Link to={user ? "/dashboard" : "/login"} className="btn-primary mt-2">{user ? "Dashboard" : "Login"}</Link>
        </div>
      )}
    </motion.header>
  );
}
