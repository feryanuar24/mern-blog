import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(false);

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const handleLogout = useCallback(() => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          handleLogout();
          return;
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [token, handleLogout]);

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700 bg-gray-900 p-10">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5 flex justify-between">
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Latest
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              A blog created with MERN Stack
            </p>
            <Link to={"/create-post"}>
              <div className="w-40 mt-8 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:scale-105 hover:-translate-x-1 transition-all duration-300 ease-in-out delay-150 hover:cursor-pointer">
                Create post
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-end justify-start">
            <button onClick={() => setProfile(!profile)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-gray-100 size-10 hover:border-2 hover:border-gray-500 hover:rounded-3xl transition-colors duration-300 ease-in-out delay-150"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
            <div className="relative">
              <div
                className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 transition-all duration-300 ease-in-out delay-150 ${
                  profile ? "opacity-100" : "opacity-0"
                }`}
                id="dropdown-2"
              >
                <div className="px-4 py-3" role="none">
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
                    {username}
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    {email}
                  </p>
                </div>
                <div
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white hover:cursor-pointer hover:rounded-b transition-colors duration-300 ease-in-out delay-150"
                  onClick={handleLogout}
                >
                  <button>Sign out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && "No posts found."}
          {posts.map((post) => {
            return (
              <li key={post._id} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
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
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              to={`/post/${post._id}`}
                              className="text-gray-900 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-500 transition-colors duration-300 ease-in-out delay-150"
                            >
                              {post.title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap text-blue-500">
                            {post.author}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-2">
                          {post.content}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          to={`/post/${post._id}`}
                          className="text-blue-500 hover:text-blue-800 dark:hover:text-blue-800 transition-colors duration-300 ease-in-out delay-150"
                          aria-label={`Read more: "${post.title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Home;
