import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [post, setPost] = useState([]);

  const handleDelete = async () => {
    const userConfirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!userConfirm) {
      return;
    } else {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://mern-blog-server-chi.vercel.app/api/posts/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to delete post:", response.statusText);
          return;
        }

        alert("Post deleted successfully!");
        navigate("/");
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://mern-blog-server-chi.vercel.app/api/posts/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          navigate("/404");
          return;
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    fetchPost();
  }, [id, navigate]);

  return (
    <article className={`bg-gray-900 lg:p-20 p-5 text-gray-50`}>
      <header>
        <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
          <dl>
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </dd>
            </div>
          </dl>
          <div className="font-bold lg:text-5xl text-3xl">
            <div>{post.title}</div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-10 py-10">
        <div className="col-span-1 font-semibold space-y-5 text-blue-500 text-sm">
          <div className="flex items-center lg:space-x-1 space-x-2 border-b border-gray-700 pb-5">
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </p>
            <p>{post.author}</p>
          </div>
          <div className="flex space-x-3">
            <Link
              to={`/edit/${id}`}
              className="hover:text-blue-800 hover:-translate-y-1 hover:scale-105  transition-all duration-300 ease-in-out delay-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </Link>
            <button
              className="hover:text-blue-800 hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out delay-150"
              onClick={handleDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
          <div className="hover:text-blue-800 transition-colors duration-300 ease-in-out delay-150">
            <Link to={"/"}>&larr; Back</Link>
          </div>
        </div>
        <div className="col-span-2 text-base">
          <p>{post.content}</p>
        </div>
      </div>
    </article>
  );
};

export default Post;
