import { Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import PageTransition from "../../components/PageTransition.jsx";
import api from "../../services/api.js";
import AuthShell from "./AuthShell.jsx";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  return (
    <PageTransition>
      <AuthShell title="Reset your password." subtitle="We will generate a secure reset token for your account.">
        <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); api.post("/auth/forgot-password", { email }).then(() => toast.success("Reset flow started")); }}>
          <label className="input flex items-center gap-3"><Mail size={18} /><input className="w-full bg-transparent outline-none" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <button className="btn-primary">Send reset token</button>
        </form>
      </AuthShell>
    </PageTransition>
  );
}
