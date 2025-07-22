import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaWallet,
  FaBullseye,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userName = localStorage.getItem("userName") || "Guest";

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <div
      className={`bg-[#1F2937] text-white h-screen py-6 px-4 ${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300 flex flex-col shadow-lg`}
    >
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <h1 className="text-xl font-semibold tracking-wide">Budget App</h1>
        )}
        <button
          onClick={toggleCollapse}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* Profile */}
      {!collapsed && (
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 mb-2 bg-gray-500 rounded-full"></div>
          <p className="text-sm font-medium">{userName}</p>
        </div>
      )}

      <nav className="flex-1 space-y-1">
        <SidebarLink
          to="/dashboard"
          icon={<FaChartPie />}
          label="Dashboard"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/dashboard/groups"
          icon={<FaUsers />}
          label="Groups"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/dashboard/expenses"
          icon={<FaWallet />}
          label="Expenses"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/dashboard/goals"
          icon={<FaBullseye />}
          label="Goals"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/dashboard/insights"
          icon={<FaChartPie />}
          label="Insights"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/dashboard/settings"
          icon={<FaCog />}
          label="Settings"
          collapsed={collapsed}
        />
      </nav>

      <div className="pt-4 mt-auto border-t border-gray-700">
        <SidebarLink
          to="/logout"
          icon={<FaSignOutAlt />}
          label="Logout"
          collapsed={collapsed}
        />
      </div>
    </div>
  );
};

const SidebarLink = ({
  to,
  icon,
  label,
  collapsed,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) => (
  <Link
    to={to}
    className="flex items-center gap-4 p-3 transition-colors rounded-md hover:bg-gray-700"
  >
    <span className="text-lg">{icon}</span>
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
  </Link>
);

export default Sidebar;
