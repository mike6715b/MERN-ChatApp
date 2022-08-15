import React from "react";

const BottomInputSection = ({ handleMessageSubmit }) => {
  return (
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
            onKeyDown={handleMessageSubmit}
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
  );
};

export default BottomInputSection;
