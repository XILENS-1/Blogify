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
    <div className="w-full p-4 over">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="loader text-2xl text-center font-semibold p-8">Loading Blogs...</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 ml-8 gap-y-16 w-full">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
