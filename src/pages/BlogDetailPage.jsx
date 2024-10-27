import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `https://blog-backend-plum-five.vercel.app/api/blog/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!blog) return <p>No blog found</p>;

  const { title, content, image, date } = blog;

  return (
    
      <div className="mt-5 ml-10 w-[1000px] items-center justify-items-center text-center relative top-[50%] left-[10%] ">
      
        <h3>{date}</h3>
        <img className="w-96 pb-5 " src={image} alt={title} />
        <p className="pb-5 font-semibold" dangerouslySetInnerHTML={{ __html: content }}></p>
      </div>
    
  );
};

export default BlogDetailPage;
