import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import About from "./pages/About.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageBlogs from "./pages/admin/ManageBlogs.jsx";
import ManageComments from "./pages/admin/ManageComments.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import AuthorProfile from "./pages/AuthorProfile.jsx";
import Categories from "./pages/Categories.jsx";
import Contact from "./pages/Contact.jsx";
import CreateBlog from "./pages/dashboard/CreateBlog.jsx";
import EditBlog from "./pages/dashboard/EditBlog.jsx";
import MyBlogs from "./pages/dashboard/MyBlogs.jsx";
import SavedBlogs from "./pages/dashboard/SavedBlogs.jsx";
import CommentsManagement from "./pages/dashboard/CommentsManagement.jsx";
import Settings from "./pages/dashboard/Settings.jsx";
import UserDashboard from "./pages/dashboard/UserDashboard.jsx";
import Explore from "./pages/Explore.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import SingleBlog from "./pages/SingleBlog.jsx";
import Trending from "./pages/Trending.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

export default function App() {
  const location = useLocation();
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Toaster position="top-right" toastOptions={{ className: "glass-toast" }} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="blogs/:slug" element={<SingleBlog />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="authors/:id" element={<AuthorProfile />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="trending" element={<Trending />} />
            <Route path="categories" element={<Categories />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="create" element={<CreateBlog />} />
              <Route path="edit/:id" element={<EditBlog />} />
              <Route path="my-blogs" element={<MyBlogs />} />
              <Route path="saved" element={<SavedBlogs />} />
              <Route path="comments" element={<CommentsManagement />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="admin" element={<DashboardLayout admin />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="blogs" element={<ManageBlogs />} />
              <Route path="comments" element={<ManageComments />} />
              <Route path="analytics" element={<Navigate to="/admin" replace />} />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  );
}
