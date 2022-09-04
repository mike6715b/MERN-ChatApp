import React, { useEffect } from "react";

import ProtectedRoutes from "utils/ProtectedRoutes";
import { Routes, Route, useNavigate } from "react-router-dom";
import { setUser } from "store/reducers/user/user";
import { useDispatch } from "react-redux";
import { SocketContext, socket } from "context/socket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "components/Login";
import Chat from "components/Chat";
import Register from "components/Register";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Attempt reauth on page load
  useEffect(() => {
    fetch(
      process.env.REACT_ENV == "production"
        ? `api/auth/reauth`
        : "http://localhost:3000/api/auth/reauth",
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
          dispatch(setUser(data.user));
          // props.history.push("/");
          navigate(`/chat`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/chat" element={<Chat />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </SocketContext.Provider>
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
