import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard ,  MdLeaderboard } from "react-icons/md";
import { IoMenu, IoClose } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";

const DashboardLayout = ({ children }) => {
    const [isClose, setIsClose] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#C2410C",
            cancelButtonColor: "#78716C",
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Logout Successfully!",
                    text: "You have been logged out.",
                    icon: "success",
                    confirmButtonColor: "#C2410C",
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => {
                    navigate("/login");
                });
            }
        });
    };

    const menuItems = [
        { title: "Dashboard", path: "/dashboard", icon: MdDashboard },
        { title: "Lead", path: "/lead", icon: MdLeaderboard },
    ];

    return (
        <div className="flex min-h-screen bg-[#FAF5EF]">
            <aside
                className={`${isClose ? "w-16" : "w-56"
                    } flex shrink-0 flex-col bg-[#C2410C] border-r border-[#9A3412] transition-all duration-300`}
            >
                <div className="flex h-16 items-center justify-center border-b border-[#D97757]">
                    {!isClose ? (
                        <h2 className="text-xl font-semibold text-white">
                            My Dashboard
                        </h2>
                    ) : (
                        <span className="text-xl font-bold text-white">M</span>
                    )}
                </div>

                <nav className="flex-1 space-y-2 p-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                title={isClose ? item.title : ""}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${isActive
                                        ? "bg-[#FED7AA] text-[#7C2D12] font-semibold shadow-sm"
                                        : "text-orange-50 hover:bg-[#9A3412]"
                                    } ${isClose ? "justify-center" : ""}`
                                }
                            >
                                <Icon className="shrink-0 text-xl" />
                                {!isClose && (
                                    <span className="text-sm">{item.title}</span>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="border-t border-[#D97757] p-3">
                    <button
                        onClick={handleLogout}
                        title={isClose ? "Logout" : ""}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-orange-100 hover:bg-[#9A3412] transition-colors ${isClose ? "justify-center" : ""
                            }`}
                    >
                        <FiLogOut className="shrink-0 text-xl" />
                        {!isClose && <span className="text-sm">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex min-w-0 flex-1 flex-col">
                <header className="flex h-16 items-center justify-between border-b border-[#E7D9CA] bg-white px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsClose(!isClose)}
                            className="rounded-lg border border-[#E7D9CA] p-2 text-xl text-[#7C2D12] hover:bg-[#FFF1E6] transition-colors"
                            aria-label="Toggle sidebar"
                        >
                            {isClose ? <IoMenu /> : <IoClose />}
                        </button>

                        <h1 className="text-lg font-semibold text-[#7C2D12]">
                            Dashboard
                        </h1>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
