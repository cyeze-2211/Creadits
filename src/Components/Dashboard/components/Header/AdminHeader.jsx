import React from "react";
import { LogOut } from "lucide-react"; // Logout icon (istalgan icon kutubxonasidan foydalanishingiz mumkin)
import { useNavigate } from "react-router-dom";


export default function AdminHeader(props) {
    let navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="flex justify-between items-center mb-6 px-6 py-4 
            bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] 
            rounded-2xl border border-white/20 shadow">
            <div className="text-white font-bold text-xl tracking-wide flex items-center gap-2">
                 <button className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/20 shadow hover:bg-white/20 transition text-xs font-semibold">O'z</button>
                <button className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/20 shadow hover:bg-white/20 transition text-xs font-semibold">Ru</button>
            </div>
            <div className="flex gap-2 items-center">
               
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 bg-red-500/80 hover:bg-red-600 text-white px-3 py-1 rounded-full border border-white/20 shadow transition text-xs font-semibold"
                >
                    <LogOut className="w-4 h-4" />
                    Chiqish
                </button>
                {props.children}
            </div>
        </div>
    );
}
