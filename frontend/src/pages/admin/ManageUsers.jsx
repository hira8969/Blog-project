import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageTransition from "../../components/PageTransition.jsx";
import api from "../../services/api.js";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/users")
      .then(({ data }) => setUsers(data.users || []))
      .catch(() => toast.error("Could not load users"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      toast.error("Could not delete user");
    }
  };

  return (
    <PageTransition>
      <h1 className="mb-6 text-4xl font-black">Manage Users</h1>
      <div className="glass rounded-[2rem] p-5">
        {loading ? (
          <p className="py-8 text-center text-slate-500">Loading users…</p>
        ) : users.length === 0 ? (
          <p className="py-8 text-center text-slate-500">No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user._id} className="flex items-center justify-between border-b border-white/10 py-4 last:border-0">
              <div className="flex items-center gap-3">
                <img src={user.avatar?.url} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="font-black">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                  <span className={`text-xs font-bold ${user.role === "admin" ? "text-aura" : "text-slate-400"}`}>
                    {user.role}
                  </span>
                </div>
              </div>
              <button className="btn-ghost" onClick={() => handleDelete(user._id, user.name)}>
                <Trash2 size={16} />Delete
              </button>
            </div>
          ))
        )}
      </div>
    </PageTransition>
  );
}
