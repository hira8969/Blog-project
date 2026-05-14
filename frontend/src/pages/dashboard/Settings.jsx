import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import PageTransition from "../../components/PageTransition.jsx";
import { updateUser } from "../../redux/slices/authSlice.js";
import api from "../../services/api.js";

export default function Settings() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    bio: "",
    website: "",
    twitter: "",
    linkedin: "",
    github: ""
  });
  const [saving, setSaving] = useState(false);

  // Pre-populate form with current user data
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        bio: user.bio || "",
        website: user.socials?.website || "",
        twitter: user.socials?.twitter || "",
        linkedin: user.socials?.linkedin || "",
        github: user.socials?.github || ""
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.patch("/users/me/profile", {
        name: form.name,
        bio: form.bio,
        socials: {
          website: form.website,
          twitter: form.twitter,
          linkedin: form.linkedin,
          github: form.github
        }
      });
      dispatch(updateUser(data.user));
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageTransition>
      <h1 className="mb-6 text-4xl font-black">Settings</h1>
      <form className="glass grid gap-4 rounded-[2rem] p-6" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-500">Display name</label>
            <input
              className="input w-full"
              placeholder="Display name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-500">Twitter handle</label>
            <input
              className="input w-full"
              placeholder="@username"
              value={form.twitter}
              onChange={(e) => setForm({ ...form, twitter: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-slate-500">Bio</label>
          <textarea
            className="input min-h-32 w-full"
            placeholder="Tell readers about yourself"
            maxLength={280}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-500">Website</label>
            <input
              className="input w-full"
              placeholder="https://yoursite.com"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-500">LinkedIn</label>
            <input
              className="input w-full"
              placeholder="linkedin.com/in/you"
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-slate-500">GitHub</label>
            <input
              className="input w-full"
              placeholder="github.com/you"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
            />
          </div>
        </div>
        <button className="btn-primary w-fit" disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
        </button>
      </form>
    </PageTransition>
  );
}
