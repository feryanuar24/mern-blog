import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreatePostAPI } from "../../api";
import Button from "../../components/UI/Button";

const CreatePost = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
  });

  const { title, content, author } = post;

  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    if (!title || !content || !author) {
      alert("All fields are required");
      setProcessing(false);
      return;
    }

    try {
      const response = await CreatePostAPI(token, title, content, author);

      if (!response.ok) {
        const data = await response.json();
        const error = data.errors.map((error) => error.msg).join("\n");
        alert(error);
        setProcessing(false);
        return;
      }

      setPost({
        title: "",
        content: "",
        author: "",
      });

      alert("Post created successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to create post", error);
      alert("Failed to create post");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto  pt:mt-0 dark:bg-gray-900">
      <div className="w-full p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="block mb-2 lg:text-3xl text-2xl font-bold text-gray-900 dark:text-white text-center">
          Create a new post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-96"
              value={content}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="author"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 w-full gap-x-10">
            <Button processing={processing} text={"Create Post"} />
            <Link to="/">
              <button className="w-full text-white h-12 justify-center bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-white hover:cursor-pointer hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out delay-150">
                Back to home
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
