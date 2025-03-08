"use client";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../store/store";
import { clearHistory } from "../redux/historySlice";
import { useDispatch } from "react-redux";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const HistoryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [darkMode, setDarkMode] = useState(false);
    const history = useSelector((state: RootState) => state.history.searches);
    const dispatch = useDispatch();

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, "d 'de' MMMM 'a las' HH:mm", { locale: es });
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    });

    if (!isOpen) return null;

    return (
        <div className="z-100 fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white bg-white-modal dark:bg-gray-900 dark:text-white p-6 rounded-lg w-96">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">Historial</h2>
                    <button className="" onClick={onClose}>
                        {
                            darkMode ? (
                                <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/FFFFFF/delete-sign--v1.png" alt="delete-sign--v1" />
                            ) : (
                                <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/1A1A1A/delete-sign--v1.png" alt="delete-sign--v1" />
                            )
                        }
                    </button>
                </div>
                <ul className="mt-3 space-y-2">
                    {history.length === 0 ? (
                        <p className="text-gray-500 text-center m-10">No hay búsquedas recientes</p>
                    ) : (
                        history.map((item, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">{item?.word}</span>
                                &nbsp; &nbsp; - &nbsp; &nbsp;
                                <span className="text-sm">{formatDate(item.timestamp)}</span>
                            </li>
                        ))
                    )}
                </ul>

                <button
                    className="w-full mt-6 px-4 py-2 bg-purple-900 text-white rounded-sm flex gap-3 justify-center items-center"
                    onClick={() => dispatch(clearHistory())}
                >
                    <img width="18" height="18" src="https://img.icons8.com/small/25/FFFFFF/filled-trash.png" alt="filled-trash" />
                    Limpiar Historial
                </button>
            </div>
        </div>
    );
};
