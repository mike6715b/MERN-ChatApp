import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "store/reducers/user/user";

import darkModeIcon from "round_dark_mode_black_24dp.png";
import lightModeIcon from "round_light_mode_white_24dp.png";
import darkLogoutIcon from "round_logout_black_24dp.png";
import lightLogoutIcon from "round_logout_white_24dp.png";

const ThemeSwitcher = ({ handleThemeClick, darkIconClass, lightIconClass }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch(
      process.env.REACT_APP_ENV === "production"
        ? `api/auth/logout`
        : "http://localhost:3000/api/auth/logout",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.info(data.message);
          dispatch(clearUser());
          navigate(`/chat`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div>
      <button
        id="theme-toggle"
        type="button"
        className="text-gray-500 text-sm p-2.5"
        onClick={handleThemeClick}
      >
        <img
          id="theme-toggle-dark-icon"
          className={darkIconClass}
          src={lightModeIcon}
          alt="Sun Icon"
        />
        <img
          id="theme-toggle-light-icon"
          className={lightIconClass}
          src={darkModeIcon}
          alt="Moon Icon"
        />
      </button>
      <button onClick={handleLogout}>
        <img
          className={darkIconClass}
          src={lightLogoutIcon}
          alt="Light logout button"
        />
        <img
          className={lightIconClass}
          src={darkLogoutIcon}
          alt="Dark logout button"
        />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
