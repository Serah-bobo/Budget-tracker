const refreshToken=async(url: string, options: any = {})=> {
  let accessToken = localStorage.getItem("accessToken");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include", // send cookie for refresh
  });

  // If token expired
  if (response.status === 401) {
    // Try to refresh
    const refreshResponse = await fetch("http://localhost:5000/api/auth/refresh", {
      method: "GET",
      credentials: "include",
    });

    if (!refreshResponse.ok) {
      // Refresh failed
      localStorage.removeItem("accessToken");
      window.location.href = "/login"; // Or use `navigate`
      throw new Error("Session expired. Please log in again.");
    }

    const data = await refreshResponse.json();
    const newToken = data.accessToken;
    localStorage.setItem("accessToken", newToken);

    // Retry original request with new token
    const retryResponse = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${newToken}`,
      },
      credentials: "include",
    });

    return retryResponse;
  }

  return response;
}
export default refreshToken;