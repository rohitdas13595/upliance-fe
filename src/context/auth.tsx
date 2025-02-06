import { createContext, useState, useEffect, useId } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { UserData } from "@/pages/types";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: {} as any,
  loading: true,
  login: () => {},
  logout: () => {},
});

function parseJWT(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));

  return {
    header,
    payload,
    signature: parts[2],
  };
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const id = useId();
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // Check localStorage for token
      const token = localStorage.getItem("token");
      if (token) {
        const userInfo = await getUserInfo(token);

        const userData: UserData = {
          name: userInfo.name,
          email: userInfo.email,
          id: id,
          address: userInfo.address,
          phone: userInfo.phone,
        };
        if (userData.email) {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      }
    } catch (error) {
      console.error("Session check failed:", error);
      //   localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await getUserInfo(response.access_token);
        const userData: UserData = {
          name: userInfo.name,
          email: userInfo.email,
          id: id,
          address: userInfo.address,
          phone: userInfo.phone,
        };
        setUser(userData);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", response.access_token);

        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  const logout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const getUserInfo = async (token: string) => {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const json = await response.json();
    console.log("...................................", json);
    return json;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
