import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-[#0f172a] via-[#0c1b33] to-[#081426] border-r border-white/5 shadow-2xl text-textSecondary flex flex-col px-8 py-10">
      
      <h1 className="text-accent text-3xl font-bold mb-12">
        ExpenseX
      </h1>

      <nav className="flex flex-col gap-6 text-lg">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-cyan-500/20 text-cyan-400 font-semibold"
                : "text-textSecondary hover:text-white"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-cyan-500/20 text-cyan-400 font-semibold"
                : "text-textSecondary hover:text-white"
            }`
          }
        >
          Transactions
        </NavLink>

        <NavLink
          to="/budgets"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-cyan-500/20 text-cyan-400 font-semibold"
                : "text-textSecondary hover:text-white"
            }`
          }
        >
          Budgets
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-cyan-500/20 text-cyan-400 font-semibold"
                : "text-textSecondary hover:text-white"
            }`
          }
        >
          Reports
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-cyan-500/20 text-cyan-400 font-semibold"
                : "text-textSecondary hover:text-white"
            }`
          }
        >
          Settings
        </NavLink>

      </nav>

      <div className="mt-auto pt-10">
        <button className="text-danger hover:opacity-80 transition">
          Log Out
        </button>
      </div>

    </div>
  );
}