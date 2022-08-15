import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "./context/socket";
import userIcon from "./round_account_circle_black_48dp.png";
import darkModeIcon from "./round_dark_mode_black_24dp.png";
import lightModeIcon from "./round_light_mode_black_24dp.png";

const Chat = () => {
  const socket = useContext(SocketContext);

  const themeToggleDarkIcon = useRef(null);
  const themeToggleLightIcon = useRef(null);

  const [darkIconClass, setDarkIconClass] = useState("w-5 h-5 hidden");
  const [lightIconClass, setLightIconClass] = useState("w-5 h-5 hidden");

  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === "dark" ? "dark" : "light";

  const toggleIconClass = (iconClass) => {
    if (iconClass === "w-5 h-5 hidden") {
      return "w-5 h-5";
    } else {
      return "w-5 h-5 hidden";
    }
  };

  useEffect(() => {
    let el = document.getElementById("allmessages");
    el.scrollTop = el.scrollHeight;
  });

  useEffect(() => {
    if (colorTheme === "dark") {
      window.document.documentElement.classList.add("dark");
    } else {
      window.document.documentElement.classList.remove("dark");
    }
  }, [colorTheme]);

  useEffect(() => {
    if (colorTheme === "dark") {
      // themeToggleLightIcon.classList.remove("hidden");
      // toggleIconClass(lightIconClass);
      setDarkIconClass(toggleIconClass(lightIconClass));
    } else {
      // themeToggleDarkIcon.classList.remove("hidden");
      // toggleIconClass(darkIconClass);
      setLightIconClass(toggleIconClass(darkIconClass));
    }
  }, [colorTheme]);

  const handleThemeClick = () => {
    // toggle icons inside button
    // themeToggleDarkIcon.classList.toggle("hidden");
    // themeToggleLightIcon.classList.toggle("hidden");
    setLightIconClass(toggleIconClass(lightIconClass));
    setDarkIconClass(toggleIconClass(darkIconClass));

    if (colorTheme === "dark") {
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden h-screen max-w-screen-2xl m-auto">
      <div className="p-12 lg:p-20 w-full">
        <div className="max-h-full h-full flex flex-row">
          {/* <!-- LEFT SIDEBAR START --> */}
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
          {/* <!-- LEFT SIDEBAR END --> */}

          {/* <!-- SECTION MESSAGES START --> */}
          <section
            className="
              relative
              max-h-full
              h-full
              bg-white
              rounded-lg
              w-full
              flex flex-col
              dark:bg-gray-900
              lg:flex
              hidden
            "
          >
            {/* <!-- ALL MESSAGES START --> */}
            <div
              id="allmessages"
              className="
                flex-1
                overflow-y-scroll
                p-5
                scrollbar-thumb-color
                dark:scrollbar-thumb-color-dark
                scrollbar-width
                space-y-5
              "
            >
              {/* <!-- REMOTE MESSAGE START --> */}
              <div className="flex justify-start">
                <div className="flex flex-col space-y-5 text-left">
                  <div>
                    <span
                      className="
                        bg-gray-100
                        text-gray-900
                        p-5
                        text-base
                        rounded-r-lg rounded-b-lg
                        inline-block
                        max-w-xl
                        dark:text-white dark:bg-gray-800
                      "
                    >
                      Waiting for your reply. I have to travel long distance.
                      Bla bla
                    </span>
                  </div>
                </div>
              </div>
              {/* <!-- REMOTE MESSAGE ENDS --> */}

              <div className="flex justify-end">
                <div className="space-y-5 text-right">
                  <div
                    className="
                      bg-indigo-800
                      text-white
                      p-5
                      text-base
                      rounded-l-lg rounded-b-lg
                      inline-block
                      max-w-xl
                    "
                  >
                    Why?
                  </div>
                </div>
              </div>

              {/* <!-- REMOTE MESSAGE START --> */}
              <div className="flex justify-start">
                <div className="flex flex-col space-y-5 text-left">
                  <div>
                    <span
                      className="
                        bg-gray-100
                        text-gray-900
                        p-5
                        text-base
                        rounded-r-lg rounded-b-lg
                        inline-block
                        max-w-xl
                        dark:text-white dark:bg-gray-800
                      "
                    >
                      Have a nice day.
                    </span>
                  </div>
                </div>
              </div>
              {/* <!-- REMOTE MESSAGE END --> */}
            </div>
            {/* <!-- ALL MESSAGES END --> */}

            {/* <!-- BOTTOM INPUT SECTION START --> */}
            <div className="flex-none p-5">
              <div>
                <div className="relative flex">
                  <span className="absolute inset-y-0 flex items-center">
                    <button
                      type="button"
                      className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-full
                        h-12
                        w-12
                        transition
                        duration-500
                        ease-in-out
                        text-gray-500
                        hover:bg-gray-300
                        focus:outline-none
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="
                      w-full
                      focus:outline-none focus:placeholder-gray-400
                      text-gray-600
                      placeholder-gray-400
                      pl-12
                      bg-gray-100
                      dark:bg-gray-800
                      rounded-full
                      py-3
                      pr-5
                    "
                  />
                  <div className="ml-5">
                    <button
                      type="button"
                      className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-full
                        h-12
                        w-12
                        transition
                        duration-500
                        ease-in-out
                        text-white
                        bg-indigo-800
                        hover:bg-indigo-600
                        focus:outline-none
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-6 w-6 transform rotate-90"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- BOTTOM INPUT SECTION END --> */}
          </section>
          {/* <!-- SECTION MESSAGES END --> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
