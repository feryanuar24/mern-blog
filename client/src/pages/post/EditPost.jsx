import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GetPostAPI, UpdatePostAPI } from "../../api";
import Button from "../../components/UI/Button";

const EditPost = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
  });

  const [processing, setProcessing] = useState(false);

  const { title, content, author } = post;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  useEffect(() => {
    const fetchPost = async () => {
      setProcessing(true);

      try {
        const response = await GetPostAPI(token, id);
        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          navigate("/");
          return;
        }

        setPost({
          title: data.title,
          content: data.content,
          author: data.author,
        });
      } catch (error) {
        alert("Failed to fetch post");
        console.error("Failed to fetch post:", error);
      } finally {
        setProcessing(false);
      }
    };

    fetchPost();
  }, [id, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    if (!title || !content || !author) {
      alert("All fields are required");
      setProcessing(false);
      return;
    }

    try {
      const response = await UpdatePostAPI(token, id, title, content, author);
      const data = await response.json();

      if (!response.ok) {
        const error = data.errors.map((error) => error.msg).join("\n");
        alert(error);
        setProcessing(false);
        return;
      }

      alert("Post edited successfully");
      navigate("/");
    } catch (error) {
      alert("Failed to edit post");
      console.error("Failed to edit post", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="relative">
      <div
        className={`${
          processing && "blur-sm"
        } flex flex-col items-center justify-center px-6 pt-8 mx-auto  pt:mt-0 dark:bg-gray-900`}
      >
        <div className="w-full p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="block mb-2 text-3xl font-bold text-gray-900 dark:text-white text-center">
            Edit post
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
            <Button processing={processing} text={"Edit Post"} />
            <Link to="/">
              <button className="w-full text-white h-12 justify-center bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-white hover:cursor-pointer hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out delay-150">
                Back to home
              </button>
            </Link>
          </div>
          </form>
        </div>
      </div>
      {processing && (
        <div className="absolute inset-0 m-auto w-32 h-32">
          <Button processing={processing} text={"Loading..."} />
        </div>
      )}
    </div>
  );
};

export default EditPost;
