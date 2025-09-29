import { useEffect, useState } from "react";
import ProfileSection from "../components/dashboard/ProfileSection";
import LoadingComponent from "../components/LoadingComponent";
import ErrorComponent from "../components/ErrorComponent";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/kite/profile`
        );

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <ErrorComponent
        error={error}
        onRetry={handleRetry}
        activeSection="profile"
        onNavigation={() => {}}
      />
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>My Profile</h2>
      <ProfileSection profileData={profileData} />
    </div>
  );
}
