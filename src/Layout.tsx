import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    //Default app code
    if (location.pathname === "/") {
      const lastApp = localStorage.getItem("last_open_app") || "todos";
      console.log(lastApp);
      navigate(`/${lastApp}`);
    }
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    const defaultClass = "flex-1 p-4 text-center";
    const activeClass = isActive ? "text-blue-400" : "bg-slate-100";

    return `${defaultClass} ${activeClass}`;
  };

  return (
    <>
      <main className="max-w-sm w-full mx-auto min-h-screen flex flex-col">
        <nav className="flex gap-4">
          <NavLink to="/todos" className={navLinkClass}>
            Todos
          </NavLink>

          <NavLink to="/notes" className={navLinkClass}>
            Notes
          </NavLink>
        </nav>

        <div className="relative flex-1">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
