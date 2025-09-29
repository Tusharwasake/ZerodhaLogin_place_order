export const checkAuthStatus = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/kite/profile`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { isValid: true, data };
    } else if (response.status === 401) {
      return { isValid: false, error: "Session expired" };
    } else {
      return { isValid: false, error: "Auth check failed" };
    }
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

export const getUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const clearStoredAuth = () => {
  localStorage.removeItem("userData");
};
