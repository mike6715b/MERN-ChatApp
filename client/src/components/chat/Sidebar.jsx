import React, { useState, useEffect } from "react";

import ThemeSwitcher from "./sidebar/ThemeSwitcher";
import UsersSection from "components/chat/sidebar/UsersSection";

const Sidebar = ({ theme, setTheme }) => {
  const [darkIconClass, setDarkIconClass] = useState("w-5 h-5 hidden");
  const [lightIconClass, setLightIconClass] = useState("w-5 h-5 hidden");

  useEffect(() => {
    if (theme === "dark") {
      setDarkIconClass(toggleIconClass(lightIconClass));
    } else {
      setLightIconClass(toggleIconClass(darkIconClass));
    }
  }, [theme]);

  const toggleIconClass = (iconClass) => {
    if (iconClass === "w-5 h-5 hidden") {
      return "w-5 h-5";
    } else {
      return "w-5 h-5 hidden";
    }
  };

  const handleThemeClick = () => {
    // toggle icons inside button

    setLightIconClass(toggleIconClass(lightIconClass));
    setDarkIconClass(toggleIconClass(darkIconClass));

    if (theme === "dark") {
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <aside className="w-full lg:w-2/6 bg-white dark:bg-gray-900 rounded-lg mr-5">
      <div className="max-h-full h-full w-full flex flex-col">
        <div className="flex p-10 justify-between">
          <div className="text-4xl font-semibold dark:text-white text-gray-900">
            Chat
          </div>
          <ThemeSwitcher
            darkIconClass={darkIconClass}
            lightIconClass={lightIconClass}
            handleThemeClick={handleThemeClick}
          />
        </div>

        <UsersSection />
      </div>
    </aside>
  );
};

export default Sidebar;
