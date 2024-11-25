import { fetchBlogs } from "@/api/api";
import BlogCard from "@/components/BlogCard";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await fetchBlogs();
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    getAllBlogs();
  }, []);

  return (
    <div className="w-full p-4 mt-16 overflow-x-hidden">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl text-center font-semibold p-8">Loading Blogs...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
