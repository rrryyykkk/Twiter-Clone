import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import Sidebar from "./components/common/Sidebar";

function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
      {/* common component, bc it's not wrapped with Routes */}
      <Sidebar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
