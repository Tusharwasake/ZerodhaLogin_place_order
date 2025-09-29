import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../features/auth/authSlice";
import { useState } from "react";
import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";
import PlaceOrderButton from "./PlaceOrderButton";
import ProfileDropdown from "./ProfileDropdown";

function Header({ activeSection, onNavigation }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/kite/logout`, {
        method: "GET",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(clearUser());
      navigate("/", { replace: true });
    }
  };

  const navItems = [
    { key: "margins", label: "Margins" },
    { key: "portfolio", label: "Portfolio" },
    { key: "orders", label: "Orders" },
    { key: "trades", label: "Trades" },
  ];

  const profileActions = [{ key: "profile", label: "Profile" }];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <HeaderLogo />

          {/* Desktop Navigation */}
          <Navigation
            navItems={navItems}
            activeSection={activeSection}
            onNavigation={onNavigation}
          />

          <div className="flex items-center space-x-4">
            {/* Desktop Place Order Button */}

            <PlaceOrderButton
              isActive={activeSection === "place-order"}
              onClick={() => onNavigation("place-order")}
            />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <ProfileDropdown
              profileActions={profileActions}
              activeSection={activeSection}
              onNavigation={onNavigation}
              onLogout={handleLogout}
              isOpen={isDropdownOpen}
              setIsOpen={setIsDropdownOpen}
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      onNavigation(item.key);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  onNavigation("place-order");
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeSection === "place-order"
                    ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                    : "text-green-600 hover:bg-green-50"
                }`}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
