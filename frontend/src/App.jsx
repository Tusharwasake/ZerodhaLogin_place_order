import React, { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Callback from "./pages/Callback";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "./features/auth/authSlice";
import { checkAuthStatus } from "./utils/auth";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const userData = localStorage.getItem("userData");

      if (userData) {
        try {
          const user = JSON.parse(userData);
          dispatch(setUser(user));

          const authResult = await checkAuthStatus();

          if (!authResult.isValid) {
            dispatch(clearUser());
            localStorage.removeItem("userData");
          }
        } catch {
          try {
            const user = JSON.parse(userData);
            dispatch(setUser(user));
          } catch {
            dispatch(clearUser());
          }
          9;
        }
      }

      setIsLoading(false);
    };

    verifyAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        <Route path="/callback" element={<Callback />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
