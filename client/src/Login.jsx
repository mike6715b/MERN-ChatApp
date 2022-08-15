import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/reducers/user/user";
import { useNavigate } from "react-router-dom";

const Login = ({ props }) => {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // Fetch login then set user state
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          dispatch(setUser(data.user));
          // props.history.push("/");
          navigate(`/chat`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5"
      >
        <h2 className="text-center text-3xl">Login</h2>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-light">Email</label>
          <input
            type="text"
            name="email"
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-light">Password</label>
          <input
            type="password"
            name="password"
            onSubmit={handleSubmit}
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
          />
        </div>
        <button
          type="submit"
          className="w-full px-10 py-2 bg-slate-900 text-white rounded-md
            hover:bg-slate-800 hover:drop-shadow-md duration-300 ease-in"
        >
          Login
        </button>
        <p className="text-right">
          <a
            className="text-blue-600 text-sm font-light hover:underline"
            href="www.google.com"
          >
            Forget Password?
          </a>
        </p>
        <p className="text-left">
          <a
            className="text-blue-600 text-sm font-light hover:underline"
            href="www.google.com"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
