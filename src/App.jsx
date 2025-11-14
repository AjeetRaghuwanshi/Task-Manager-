import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Completed from "./pages/Completed";
import Home from "./pages/Home";
import Important from "./pages/Important";
import Todo from "./pages/Todo";
import AllTask from "./pages/AllTask";
import ProtectionRoute from "./components/ProtectionRoute";
import MobileSideBar from "./components/MobileSideBar";

const App = () => {
  const mobileMenuRef = useRef();

  const [showMobileMainDropdown, setShowMobileMainDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const handler = (e) => {
      if (!mobileMenuRef.current.contains(e.target)) {
        console.log(mobileMenuRef);
        setShowMobileMainDropdown(false);
      }
    };

    if (showMobileMainDropdown) {
      document.addEventListener("mousedown", handler);
    } else {
      document.removeEventListener("mousedown", handler);
    }
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [showMobileMainDropdown]);

  return (
    <div>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Catch-all for routes with a layout */}
        <Route
          path="*"
          element={
            <>
              <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
              <div className="flex">
                <Sidebar isMenuOpen={isMenuOpen} />
                <MobileSideBar
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                />
                <div className="flex-1">
                  <Routes>
                    <Route
                      path="/all-task"
                      element={
                        <ProtectionRoute>
                          <AllTask />
                        </ProtectionRoute>
                      }
                    />
                    <Route
                      path="/todo"
                      element={
                        <ProtectionRoute>
                          <Todo />
                        </ProtectionRoute>
                      }
                    />
                    <Route
                      path="/important"
                      element={
                        <ProtectionRoute>
                          <Important />
                        </ProtectionRoute>
                      }
                    />
                    <Route
                      path="/completed"
                      element={
                        <ProtectionRoute>
                          <Completed />
                        </ProtectionRoute>
                      }
                    />
                  </Routes>
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
