"use client";
import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HistoryModal } from "./historyModal";

export const NavBar = () => {
    const [font, setFont] = useState("Serif");
    const [darkMode, setDarkMode] = useState(false);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        document.body.style.fontFamily =
            font === "Serif"
                ? "serif"
                : font === "Sans serif"
                    ? "sans-serif"
                    : "monospace";
    }, [font]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    return (
        <nav className="w-full flex justify-between items-center gap-4 p-4">
            <img width="40" height="40" src="https://img.icons8.com/ios/50/929292/book--v1.png" alt="book" />

            <div className="flex items-center gap-4">
                <div className="border-r border-r-gray-300 pr-4">
                    <select
                        className="w-27 border-none focus:outline-none"
                        value={font}
                        onChange={(e) => setFont(e.target.value)}
                    >
                        <option value="Serif">Serif</option>
                        <option value="Sans serif">Sans serif</option>
                        <option value="Monospace">Monospace</option>
                    </select>
                </div>

                <label className="relative inline-block w-10 h-6 ml-1">
                    <input
                        type="checkbox"
                        className="hidden peer"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                    <div className="absolute inset-0 cursor-pointer rounded-full bg-gray-600 transition duration-200 peer-checked:bg-purple-900 peer-focus:ring-2 peer-focus:ring-gray-600"></div>
                    <div className="absolute left-1 bottom-[4px] w-4 h-4 rounded-full bg-white transition-transform duration-400 peer-checked:bg-gray-100 peer-checked:translate-x-4"></div>
                </label>

                {
                    darkMode ? (
                        <img width="25" height="25" src="https://img.icons8.com/ios/50/FFFFFF/sun--v1.png" alt="sun" />
                    ) : (
                        <img width="25" height="25" src="https://img.icons8.com/ios/50/moon-symbol.png" alt="moon" />
                    )
                }

                <div className="border-l border-l-gray-300 pl-4">
                    <button className='text-purple-600 flex gap-2' onClick={() => setIsModalOpen(true)}>
                        {
                            darkMode ? (
                                <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/FFFFFF/time-machine.png" alt="time-machine" />
                            ) : (
                                <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/000000/time-machine.png" alt="time-machine" />
                            )
                        }
                    </button>
                </div>

                <HistoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </nav>
    )
}