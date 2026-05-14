export const cx = (...classes) => classes.filter(Boolean).join(" ");

export const formatDate = (value) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));

export const stripHtml = (html = "") => html.replace(/<[^>]+>/g, "");

export const demoBlogs = [
  {
    _id: "demo-1",
    title: "Designing Interfaces That Feel Quietly Expensive",
    slug: "designing-interfaces-that-feel-quietly-expensive",
    excerpt: "A practical guide to contrast, rhythm, animation, and visual restraint in premium product UI.",
    readingTime: 5,
    views: 1530,
    likes: ["1", "2", "3"],
    tags: ["design", "ux", "saas"],
    createdAt: new Date().toISOString(),
    coverImage: { url: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=80" },
    author: { _id: "author-1", name: "Ava Sterling", bio: "Editor and product designer.", avatar: { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" } },
    category: { name: "Design", color: "#fb7185" }
  },
  {
    _id: "demo-2",
    title: "The Full-Stack Playbook for Fast Startup Teams",
    slug: "the-full-stack-playbook-for-fast-startup-teams",
    excerpt: "How to structure product code so small teams can ship quickly without making tomorrow miserable.",
    readingTime: 7,
    views: 2310,
    likes: ["1", "2", "3", "4"],
    tags: ["engineering", "startup"],
    createdAt: new Date().toISOString(),
    coverImage: { url: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80" },
    author: { _id: "author-2", name: "Noah Vale", bio: "Full-stack architect.", avatar: { url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" } },
    category: { name: "Engineering", color: "#2dd4bf" }
  },
  {
    _id: "demo-3",
    title: "AI Notes From a Product Builder",
    slug: "ai-notes-from-a-product-builder",
    excerpt: "The best AI products do not show off the model; they create a crisp moment of user relief.",
    readingTime: 4,
    views: 1980,
    likes: ["1", "2"],
    tags: ["ai", "product"],
    createdAt: new Date().toISOString(),
    coverImage: { url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80" },
    author: { _id: "author-3", name: "Mira Chen", bio: "AI product strategist.", avatar: { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" } },
    category: { name: "AI", color: "#7c3aed" }
  }
];
