import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "store/reducers/user/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/chat");
    }
  });

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.email.value || !e.target.password.value) {
      toast.warn("Please fill in all the fields");
      return;
    }

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Check if passwords match
    if (password !== e.target.confirmPassword.value) {
      toast.warn("Passwords do not match");
      return;
    }

    //Check if password is strong enough
    if (password.length < 8) {
      toast.warn("Password must be at least 8 characters long");
      return;
    }

    fetch(
      process.env.REACT_ENV === "production"
        ? `api/auth/register`
        : "http://localhost:3000/api/auth/register",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log({ dataError: data.error });
          toast.error(data.error);
        } else {
          dispatch(setUser(data.user));
          navigate(`/chat`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5"
      >
        <h2 className="text-center text-3xl">Register</h2>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-light">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-light">Email</label>
          <input
            type="text"
            name="email"
            required
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-light">Password</label>
          <input
            type="password"
            name="password"
            onSubmit={handleSubmit}
            required
            minLength={8}
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-light">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            onSubmit={handleSubmit}
            required
            minLength={8}
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
          />
        </div>
        <button
          type="submit"
          className="w-full px-10 py-2 bg-slate-900 text-white rounded-md
            hover:bg-slate-800 hover:drop-shadow-md duration-300 ease-in"
        >
          Register
        </button>
        <p className="text-right">
          <span
            className="text-blue-600 text-sm font-light hover:underline"
            onClick={handleLoginRedirect}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
