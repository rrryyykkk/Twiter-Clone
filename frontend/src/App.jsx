import { Outlet } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "../src/components/common/RightPanel";

function App() {
  return (
    <div className="flex max-w-6xl mx-auto">
      {/* common component, bc it's not wrapped with Routes */}
      <Sidebar />
      <Outlet />
      <RightPanel />
    </div>
  );
}

export default App;
