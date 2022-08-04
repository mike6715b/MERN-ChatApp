import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Chat from "./Chat";

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
