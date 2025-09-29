import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/layout/Header";
import ProfileSection from "../components/dashboard/ProfileSection";
import MarginsSection from "../components/layout/dashboard/MarginsSection";
import PlaceOrder from "../components/trading/PlaceOrder";
import Orders from "../components/trading/Orders";
import Portfolio from "../components/trading/Portfolio";
import LoadingComponent from "../components/LoadingComponent";
import {
  setProfileData,
  setLoading,
  setError,
} from "../features/auth/profileSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const [marginData, setMarginData] = useState(null);
  const [activeSection, setActiveSection] = useState("margins");
  const loading = useSelector((state) => state.profile.loading);
  const profileData = useSelector((state) => state.profile.data);

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        dispatch(setLoading(true));
        dispatch(setError(null));

        // Fetch margins data

        const marginsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/kite/margins`
        );

        if (marginsResponse.ok) {
          const marginsData = await marginsResponse.json();
          console.log("Margin data:", marginsData);
          setMarginData(marginsData);
        }

        // Fetch profile data
        const profileResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/kite/profile`
        );

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          console.log("Profile data:", profileData);
          dispatch(setProfileData(profileData));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        dispatch(setError(err.message));
      } finally {
        setLoading(false);
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection profileData={profileData} />;

      case "margins":
        return <MarginsSection marginData={marginData} />;

      case "portfolio":
        return <Portfolio />;

      case "place-order":
        return <PlaceOrder />;

      case "orders":
        return <Orders />;

      default:
        return <ProfileSection profileData={profileData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} onNavigation={handleNavigation} />
      <main className="container mx-auto px-4 py-6">{renderContent()}</main>
    </div>
  );
}

export default Dashboard;
