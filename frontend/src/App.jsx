import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Homepage from "./pages/homepage";
import Profilepage from "./pages/profilepage";
import Settingspage from "./pages/settingspage";
import Signuppage from "./pages/signuppage";
import Loginpage from "./pages/loginpage";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
// import themes from "daisyui/theme/object";


const App = () => {
  const { authuser, checkauth, ischeckingin , onlineUsers} = useAuthStore();
  const {theme} = useThemeStore();

  console.log("onlineusers",onlineUsers)
 
  useEffect(() => {
    checkauth();
  }, [checkauth]);

  console.log({ authuser });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // ✅ Loading Screen (Dark Mode Applied)
  if (ischeckingin && !authuser) {
    return (
      <div className="min-h-screen bg-base-100 text-base-content flex items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    // ✅ Global Dark Background
    <div className="min-h-screen bg-base-100 text-base-content" >
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authuser ? <Homepage /> : <Navigate to="/login" />}
        />

        <Route
          path="/signup"
          element={!authuser ? <Signuppage /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!authuser ? <Loginpage /> : <Navigate to="/" />}
        />

        <Route path="/settings" element={<Settingspage />} />

        <Route
          path="/profile"
          element={authuser ? <Profilepage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;