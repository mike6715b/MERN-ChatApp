import React from "react";

const Sidebar = ({
  handleThemeClick,
  themeToggleDarkIcon,
  themeToggleLightIcon,
  darkIconClass,
  lightModeIcon,
  lightIconClass,
  darkModeIcon,
  userIcon,
}) => {
  return (
    <aside className="w-full lg:w-2/6 bg-white dark:bg-gray-900 rounded-lg mr-5">
      <div className="max-h-full h-full w-full flex flex-col">
        <div className="flex p-10 justify-between">
          <div className="text-4xl font-semibold dark:text-white text-gray-900">
            Chat
          </div>
          {/* <!-- SWITCHER START --> */}
          <div>
            <button
              id="theme-toggle"
              type="button"
              className="text-gray-500 text-sm p-2.5"
              onClick={handleThemeClick}
            >
              {/* <!-- SUN ICON START--> */}
              <img
                id="theme-toggle-dark-icon"
                ref={themeToggleDarkIcon}
                className={darkIconClass}
                // fill="currentColor"
                // viewBox="0 0 20 20"
                src={lightModeIcon}
                alt="Sun Icon"
              />
              {/* <!-- SUN ICON END--> */}
              {/* <!-- MOON ICON START--> */}
              <img
                id="theme-toggle-light-icon"
                ref={themeToggleLightIcon}
                className={lightIconClass}
                // fill="currentColor"
                // viewBox="0 0 20 20"
                src={darkModeIcon}
                alt="Moon Icon"
              />
              {/* <!-- MOON ICON END--> */}
            </button>
          </div>
          {/* <!-- SWITCHER END --> */}
        </div>

        {/* <!-- USERS SECTION START --> */}
        <div
          className="
                  flex-1
                  overflow-y-scroll
                  scrollbar-thumb-color
                  dark:scrollbar-thumb-color-dark
                  scrollbar-width
                "
        >
          <div className="w-full space-y-10">
            {/* <!-- USER --> */}
            <div className="cursor-pointer flex px-10">
              <div className="mr-4 relative w-12">
                <img
                  className="rounded-full w-full mr-2"
                  src={userIcon}
                  alt="user"
                />
                <div
                  className="
                          w-3
                          h-3
                          bg-green-500
                          rounded-full
                          absolute
                          bottom-0
                          right-0
                        "
                ></div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-center">
                  <div
                    className="
                            text-gray-800 text-base
                            font-semibold
                            dark:text-gray-300
                          "
                  >
                    James Bond
                  </div>
                  <div className="text-gray-700 dark:text-gray-600 text-xs">
                    17:31
                  </div>
                </div>
                <div className="text-gray-400 text-sm dark:text-gray-600">
                  Hi are you around?
                </div>
              </div>
            </div>
            {/* <!-- END USER --> */}
          </div>
        </div>
        {/* <!-- USERS SECTION END --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
