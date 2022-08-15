import React from "react";

const RemoteMessage = ({ content }) => {
  return (
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
            {content}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RemoteMessage;
