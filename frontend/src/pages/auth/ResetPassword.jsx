import { Lock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import { setCredentials } from "../../redux/slices/authSlice.js";
import api from "../../services/api.js";
import AuthShell from "./AuthShell.jsx";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <PageTransition>
      <AuthShell title="Choose a new password." subtitle="Use something memorable, private, and at least six characters.">
        <form className="grid gap-4" onSubmit={async (e) => { e.preventDefault(); const { data } = await api.post(`/auth/reset-password/${token}`, { password }); dispatch(setCredentials(data)); toast.success("Password updated"); navigate("/dashboard"); }}>
          <label className="input flex items-center gap-3"><Lock size={18} /><input className="w-full bg-transparent outline-none" type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
          <button className="btn-primary">Reset password</button>
        </form>
      </AuthShell>
    </PageTransition>
  );
}
