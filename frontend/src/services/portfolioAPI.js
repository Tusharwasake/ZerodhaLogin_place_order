const API_BASE = import.meta.env.VITE_API_URL;

export const fetchHoldings = async () => {
  const response = await fetch(`${API_BASE}/portfolio/holdings`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const fetchPositions = async () => {
  const response = await fetch(`${API_BASE}/portfolio/positions`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const fetchTrades = async () => {
  const response = await fetch(`${API_BASE}/portfolio/trades`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};
