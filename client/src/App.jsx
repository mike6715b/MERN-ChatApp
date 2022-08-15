import ProtectedRoutes from "utils/ProtectedRoutes";
import { Routes, Route } from "react-router-dom";
import { SocketContext, socket } from "context/socket";

import Login from "components/Login";
import Chat from "components/Chat";

function App() {
  return (
    <div className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/chat" element={<Chat />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
