import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Post from "./pages/Post.jsx";
import EditPost from "./pages/EditPost.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditPost />
            </PrivateRoute>
          }
        />
        <Route path="*" Component={NotFound} />
      </Routes>
    </Router>
  );
}

export default App;
