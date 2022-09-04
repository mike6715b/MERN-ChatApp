import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "context/socket";
import Message from "components/chat/Message";
import BottomInputSection from "components/chat/BottomInputSection";
import Sidebar from "components/chat/Sidebar";
import userIcon from "round_account_circle_black_48dp.png";

const Chat = () => {
  const socket = useContext(SocketContext);

  const themeToggleDarkIcon = useRef(null);
  const themeToggleLightIcon = useRef(null);

  const [darkIconClass, setDarkIconClass] = useState("w-5 h-5 hidden");
  const [lightIconClass, setLightIconClass] = useState("w-5 h-5 hidden");

  const [theme, setTheme] = useState(localStorage.theme);

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
    if (theme === "dark") {
      window.document.documentElement.classList.add("dark");
    } else {
      window.document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (theme === "dark") {
      setDarkIconClass(toggleIconClass(lightIconClass));
    } else {
      setLightIconClass(toggleIconClass(darkIconClass));
    }
  }, [theme]);

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

  const handleMessageSubmit = (e) => {
    e.preventDefault();
  };

  const handleMessageReceive = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-1 overflow-hidden h-screen max-w-screen-2xl m-auto">
      <div className="p-12 lg:p-20 w-full">
        <div className="max-h-full h-full flex flex-row">
          {/* <!-- LEFT SIDEBAR START --> */}
          <Sidebar
            handleThemeClick={handleThemeClick}
            themeToggleDarkIcon={themeToggleDarkIcon}
            themeToggleLightIcon={themeToggleLightIcon}
            darkIconClass={darkIconClass}
            lightIconClass={lightIconClass}
            userIcon={userIcon}
          />
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
              <Message
                isRemote="true"
                content="Waiting for your reply. I have to travel long distance.
                      Bla bla"
              />
              {/* <!-- REMOTE MESSAGE ENDS --> */}

              {/* <!-- LOCAL MESSAGE START --> */}
              <Message isRemote="false" content="Why?" />
              {/* <!-- LOCAL MESSAGE ENDS --> */}

              {/* <!-- REMOTE MESSAGE START --> */}
              <Message isRemote="true" content="Have a nice day." />
              <Message isRemote="false" content="You too." />
              {/* <!-- REMOTE MESSAGE END --> */}
            </div>
            {/* <!-- ALL MESSAGES END --> */}

            {/* <!-- BOTTOM INPUT SECTION START --> */}
            <BottomInputSection handleMessageSubmit={handleMessageSubmit} />
            {/* <!-- BOTTOM INPUT SECTION END --> */}
          </section>
          {/* <!-- SECTION MESSAGES END --> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
