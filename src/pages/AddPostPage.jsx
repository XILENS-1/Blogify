import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createPost } from "../api/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); 
  const [previewImage, setPreviewImage] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const navigate = useNavigate();

 
  const userId = useSelector((state) => state.auth.user.id);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

   
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };

  const removeImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

  const handleSubmit = async () => {

    if (!title || !value || !category) {
      alert("Please fill in all the required fields.");
      return;
    }
    if (value.trim() === "<p><br></p>") {
      alert("Content cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", value);
    formData.append("category", category);
    formData.append("user", userId);

    if (image) {
      formData.append("image", image);
    }

    try {
      await createPost(formData); 
      navigate("/"); 
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("There was an error creating the blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 h-full bg-gray-100">
      <h1 className="text-2xl text-center font-semibold mb-8">
        Add New Blog Post
      </h1>
      <div className="bg-white h-fit p-8 rounded-md drop-shadow-md">
        {/* Tittle Section */}
        <label htmlFor="title" className="text-xl font-semibold">
          Tittle:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent border border-gray-300 mb-4 p-2 outline-none"
        />

        {/* Category Section */}
        <label htmlFor="category" className="text-xl font-semibold">
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-transparent border border-gray-300 mb-4 p-2 outline-none"
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
        </select>

        {/* Image Section */}
        <label htmlFor="image" className="text-xl font-semibold">
          Image:
        </label>
        {previewImage ? (
          <div className="relative w-full max-w-lg mb-4">
            <img
              src={previewImage}
              alt="Selected"
              className="w-full h-auto rounded-md"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2"
              aria-label="Remove selected image"
            >
              &#x2715;
            </button>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 mb-4 text-center border-gray-300"
          />
        )}

        {/* Content Section */}
        <label htmlFor="content" className="text-xl font-semibold">
          Content:
        </label>
        <ReactQuill
          className="h-72 rounded-md"
          theme="snow"
          value={value}
          onChange={setValue}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`bg-red-500 text-white px-8 py-4 font-bold rounded-md mt-16 hover:bg-black/90 ${
            isSubmitting ? "opacity-50" : ""
          }`}
        >
          {isSubmitting ? "Publishing..." : "Publish Blog"}
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
