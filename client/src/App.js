import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IndexPost from "./pages/post/IndexPost.jsx";
import CreatePost from "./pages/post/CreatePost.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import ShowPost from "./pages/post/ShowPost.jsx";
import EditPost from "./pages/post/EditPost.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <IndexPost />
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
              <ShowPost />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
