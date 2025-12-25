import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";

export default function AppLayout({children}) {
  return (
    <div className="min-h-screen flex ">
        <aside className="w-64 shrink-0">
             <Menubar />
        </aside>
    <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
    </div>
      

    </div>
  );
}
