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
      <div className="w-full space-y-10">
        {/* Each conversation partner will be listed here */}
        <User
          userName="James Bond"
          userMessage="Hello there"
          userMessageTimestamp="22:41"
          authorRemote={true}
        />
      </div>
    </div>
  );
};

export default UsersSection;
