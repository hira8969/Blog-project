import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import Particles from "../components/Particles.jsx";

export default function AppLayout() {
  return (
    <>
      <Particles />
      <NavBar />
      <div className="pt-28">
        <Outlet />
      </div>
      <footer className="mx-auto mt-20 max-w-7xl px-4 pb-10">
        <div className="glass flex flex-col justify-between gap-4 rounded-[2rem] p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-black">Lumina</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">A cinematic blog platform for modern creators.</p>
          </div>
          <p className="text-sm text-slate-500">Built for Vercel, Render, and MongoDB Atlas.</p>
        </div>
      </footer>
    </>
  );
}
