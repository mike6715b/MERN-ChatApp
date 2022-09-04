import ProtectedRoutes from "utils/ProtectedRoutes";
import { Routes, Route } from "react-router-dom";
import { SocketContext, socket } from "context/socket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "components/Login";
import Chat from "components/Chat";
import Register from "components/Register";

function App() {
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
