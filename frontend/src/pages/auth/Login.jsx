import { Eye, Lock, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import { setCredentials } from "../../redux/slices/authSlice.js";
import api from "../../services/api.js";
import AuthShell from "./AuthShell.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      dispatch(setCredentials(data));
      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <PageTransition>
      <AuthShell title="Welcome back to Lumina." subtitle="Pick up drafts, moderate comments, and keep your audience close.">
        <form onSubmit={submit} className="grid gap-4">
          <label className="input flex items-center gap-3"><Mail size={18} /><input className="w-full bg-transparent outline-none" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
          <label className="input flex items-center gap-3"><Lock size={18} /><input className="w-full bg-transparent outline-none" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /><Eye size={18} /></label>
          <div className="flex items-center justify-between text-sm"><label className="flex gap-2"><input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} />Remember me</label><Link to="/forgot-password" className="font-bold text-aura">Forgot?</Link></div>
          <button className="btn-primary">Login</button>
          <p className="text-center text-sm">New here? <Link to="/register" className="font-black text-coral">Create account</Link></p>
        </form>
      </AuthShell>
    </PageTransition>
  );
}
