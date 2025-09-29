import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";
import { setProfileData } from "../features/auth/profileSlice";

function Callback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/kite/profile`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const profileData = await response.json();
        dispatch(setProfileData(profileData));
      }
    } catch {
      // handle error silently
    }
  }, [dispatch]);

  useEffect(() => {
    const status = searchParams.get("status");
    const user_id = searchParams.get("user_id");
    const message = searchParams.get("message");

    if (status == "success" && user_id) {
      const userData = { user_id, loginTime: new Date().toISOString() };
      dispatch(setUser(userData));
      fetchUserProfile();
      navigate("/dashboard", { replace: true });
    } else {
      alert("Login failed: " + (message || "Unknown error"));
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate, searchParams, fetchUserProfile]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Processing login...</h2>
      <p>Please wait while we complete your authentication.</p>
    </div>
  );
}

export default Callback;
