import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import Sidebar from "./components/common/Sidebar";
import RighPanel from "../src/components/common/RightPanel";
import Notification from "./pages/notification/Notification";

function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
      {/* common component, bc it's not wrapped with Routes */}
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notification" element={<Notification />} />
        
      </Routes>
      <RighPanel />
    </div>
  );
}

export default App;
