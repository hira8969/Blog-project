import { useEffect, useState } from "react";
import api from "../services/api.js";
import { demoBlogs } from "../utils/helpers.js";

export default function useBlogs(params = {}) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({});
  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .get("/blogs", { params })
      .then(({ data }) => {
        if (!alive) return;
        setBlogs(data.blogs?.length ? data.blogs : demoBlogs);
        setMeta(data);
      })
      .catch(() => alive && setBlogs(demoBlogs))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [JSON.stringify(params)]);
  return { blogs, loading, meta };
}
