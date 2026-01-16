import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";
import { Outlet } from "react-router";
export default function AppLayout({children}) {
  
  return (
    <div className="min-h-screen flex ">
    <aside className="w-64 ">
      <Menubar />
    </aside>

    <div className="flex flex-col flex-1">
      <Navbar />

      <main className="flex-1 p-6 overflow-y-auto ">
         <Outlet />
      </main>
    </div>
      

    </div>
  );
}
