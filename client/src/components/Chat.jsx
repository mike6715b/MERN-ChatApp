import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "context/socket";
import Message from "components/chat/Message";
import BottomInputSection from "components/chat/BottomInputSection";
import Sidebar from "components/chat/Sidebar";

const Chat = () => {
  const socket = useContext(SocketContext);

  const [theme, setTheme] = useState(localStorage.theme);

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
          <Sidebar theme={theme} setTheme={setTheme} />

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
              <Message
                isRemote="true"
                content="Waiting for your reply. I have to travel long distance.
                      Bla bla"
              />
              <Message isRemote="false" content="Why?" />
              <Message isRemote="true" content="Have a nice day." />
              <Message isRemote="false" content="You too." />
            </div>
            {/* <!-- ALL MESSAGES END --> */}

            <BottomInputSection handleMessageSubmit={handleMessageSubmit} />
          </section>
          {/* <!-- SECTION MESSAGES END --> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
