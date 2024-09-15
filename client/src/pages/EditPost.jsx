import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:5000/posts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          navigate("/404");
          return;
        }

        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        navigate("/error");
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author) {
      alert("All fields are required");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, author }),
      });

      if (!response.ok) {
        const data = await response.json();
        const error = data.errors.map((error) => error.msg).join("\n");
        alert(error);
        return;
      }

      alert("Post edited successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to edit post", error);
      alert("Failed to edit post");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto  pt:mt-0 dark:bg-gray-900">
      <div className="w-full p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="block mb-2 text-3xl font-bold text-gray-900 dark:text-white text-center">
          Edit post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Content
            </label>
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-96"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Author
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="flex lg:space-x-20 space-x-3 items-center">
            <div className="text-white w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out delay-150">
              <button type="submit">Edit Post</button>
            </div>
            <div className="text-white w-full justify-center bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 hover:cursor-pointer hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out delay-150">
              <Link to="/">Back to home</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
