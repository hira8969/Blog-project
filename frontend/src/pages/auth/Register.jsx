import { Lock, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import { setCredentials } from "../../redux/slices/authSlice.js";
import api from "../../services/api.js";
import AuthShell from "./AuthShell.jsx";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/auth/register", form);
      dispatch(setCredentials(data));
      toast.success("Your studio is ready");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };
  return (
    <PageTransition>
      <AuthShell title="Start writing beautifully." subtitle="Register securely and publish your first story in minutes.">
        <form onSubmit={submit} className="grid gap-4">
          <label className="input flex items-center gap-3"><UserRound size={18} /><input className="w-full bg-transparent outline-none" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
          <label className="input flex items-center gap-3"><Mail size={18} /><input className="w-full bg-transparent outline-none" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
          <label className="input flex items-center gap-3"><Lock size={18} /><input className="w-full bg-transparent outline-none" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
          <button className="btn-primary">Create account</button>
          <p className="text-center text-sm">Already a member? <Link to="/login" className="font-black text-coral">Login</Link></p>
        </form>
      </AuthShell>
    </PageTransition>
  );
}
