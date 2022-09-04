import React from "react";
import User from "components/chat/sidebar/User";

const UsersSection = () => {
  return (
    <div
      className="
                  flex-1
                  overflow-y-scroll
                  scrollbar-thumb-color
                  dark:scrollbar-thumb-color-dark
                  scrollbar-width
                "
    >
      <div className="w-full space-y-3">
        {/* Each conversation partner will be listed here */}
        <User
          userName="James Bond"
          userMessage="I'm going to make him an offer he can't refuse. He will be extatic."
          userMessageTimestamp="22:41"
          authorRemote={true}
        />
        <User
          userName="Harry Potter"
          userMessage="You're a wizzard dev!"
          userMessageTimestamp="13:37"
          authorRemote={true}
        />
        <User
          userName="Darth Vader"
          userMessage="I am your father"
          userMessageTimestamp="16:20"
          authorRemote={true}
        />
      </div>
    </div>
  );
};

export default UsersSection;
