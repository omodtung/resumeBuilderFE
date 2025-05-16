import { AuthProvider } from "react-admin";

const customAuthProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:8080/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Use email directly
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.access_token);
      sessionStorage.setItem("userId", data.userId);
    } catch (error) {
      throw new Error("Login failed");
    }
  },

  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = sessionStorage.getItem("token");
    return token ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),
};

export default customAuthProvider;
