import { fetchBlogByUser } from "@/api/api";
import BlogCard from "@/components/BlogCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AllPostPage = () => {
  const userId = useSelector((state) => state.auth.user.id);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(userId);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await fetchBlogByUser(userId);
        const data = response.data;
        setBlogs(data.blogs);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching blogs:", error);
      }
    };
    getAllPosts();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="loader font-semibold text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mt-16 w-full p-4">
      {blogs.length === 0 ? (
        <p className="text-center text-xl font-semibold">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-3 ml-8 gap-y-16 w-full p-4">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPostPage;
