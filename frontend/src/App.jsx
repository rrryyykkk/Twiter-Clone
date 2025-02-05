import { Outlet } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "../src/components/common/RightPanel";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
  const { data: authUser, isLoading } = useQuery({
    // we use queryKey to gigve a unique name to our query dan refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("data:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      {/* common component, bc it's not wrapped with Routes */}
      {authUser && <Sidebar />}
      <Outlet />
      {authUser && <RightPanel />}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
