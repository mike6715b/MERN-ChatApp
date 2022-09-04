import React from "react";

import userIcon from "round_account_circle_black_48dp.png";

const User = ({
  userName,
  userMessageTimestamp,
  userMessage,
  authorRemote,
}) => {
  const userMessageText = () => {
    if (authorRemote) {
      return userMessage;
    } else {
      return `You: ${userMessage}`;
    }
  };

  return (
    <>
      <div className="cursor-pointer flex px-10 hover:dark:bg-gray-800 hover:bg-gray-200 py-2">
        <div className="mr-4 relative w-12">
          <img className="rounded-full w-full mr-2" src={userIcon} alt="user" />
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
              {userName}
            </div>
            <div className="text-gray-700 dark:text-gray-600 text-xs">
              {userMessageTimestamp}
            </div>
          </div>
          <div className="text-gray-400 text-sm dark:text-gray-600 whitespace-nowrap text-ellipsis">
            {userMessageText()}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
