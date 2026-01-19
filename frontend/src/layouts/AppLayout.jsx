import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";
import { Outlet } from "react-router";
export default function AppLayout({children}) {
  
  return (
    <div className="min-h-screen flex  ">
    <aside className="lg:w-64 md:w-60 sm:w-0">
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
