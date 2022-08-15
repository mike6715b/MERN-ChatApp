import React from "react";

const LocalMessage = ({ content }) => {
  return (
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
          {content}
        </div>
      </div>
    </div>
  );
};

export default LocalMessage;
