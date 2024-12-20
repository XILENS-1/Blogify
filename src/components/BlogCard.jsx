import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, content, image, _id } = blog;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details/${_id}`);
  };

  return (
    <div
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:scale-105 transition-transform"
      onClick={handleCardClick}
    >
      <img
        className="rounded-t-lg h-48 w-full object-cover"
        src={image}
        alt={title}
      />
      <div className="p-4">
        <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">
          {title}
        </h5>
        <p
          className="mb-3 text-sm text-gray-700 dark:text-gray-400 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Link
          to={`/details/${_id}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => e.stopPropagation()} 
        >
          Read more
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
