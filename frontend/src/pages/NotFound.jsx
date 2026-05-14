import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";

export default function NotFound() {
  return (
    <PageTransition className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div className="glass max-w-xl rounded-[2rem] p-10">
        <p className="text-8xl font-black gradient-text">404</p>
        <h1 className="mt-4 text-3xl font-black">This page drifted away.</h1>
        <Link to="/" className="btn-primary mt-7">Return home</Link>
      </div>
    </PageTransition>
  );
}
