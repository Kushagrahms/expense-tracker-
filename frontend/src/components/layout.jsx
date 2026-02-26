import Sidebar from "./sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0b1426] relative overflow-hidden">
      
      {/* 🔵 Background Glow Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <Sidebar />

      {/* 🔷 Main Content Area */}
      <div className="flex-1 px-16 py-12 bg-gradient-to-br from-[#0f1c2e] via-[#0c1930] to-[#0a1628]">
        {children}
      </div>

    </div>
  );
}