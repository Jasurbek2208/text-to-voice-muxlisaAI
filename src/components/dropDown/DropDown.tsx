import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

// Store redux
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@hooks/reduxSelector";
import { clearTextToVoiceHistory, clearVoiceToTextHistory, userAuth } from "@store/store";

// Helpers
import { clearHistory } from "@helpers/index";

export default function DropDown() {
  const dispatch = useDispatch();
  const { user: { userId } } = useTypedSelector(store => store?.store)
  
  const pathname = useLocation().pathname as "text-to-voice" | "voice-to-text";

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function clearHistoryChange() {
    const type = { type: "CLEAR_HISTORY" }

    dispatch(pathname === "text-to-voice" ? clearTextToVoiceHistory(type) : clearVoiceToTextHistory(type));
    clearHistory(pathname, userId);
  }

  useEffect(() => {
    // Function to handle clicks outside of the button
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef?.current &&
        !dropdownRef?.current.contains(event?.target as Node) &&
        buttonRef?.current &&
        !buttonRef?.current.contains(event?.target as Node)
      ) {
        // Click occurred outside of the button, close the dropdown menu
        setIsMenuOpen(false);
      }
    };

    // Attach the event listener
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isMenuOpen]);

  const menuItems = [
    {
      label: "Yozishmalarni tozalash",
      onClick: clearHistoryChange,
      icon: [
        "M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z",
        "M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z",
      ],
    },
    {
      label: "Yozishmalar tarixini qo'shish",
      icon: [
        "M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z",
        "M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z",
      ],
    },
    {
      label: "Ushbu yozishmalar tarixidan nusxa olish",
      icon: [
        "M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z",
        "M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z",
      ],
    },
    {
      label: "Hisobdan chiqish",
      onClick: () => dispatch(userAuth({ data: null, type: "LOGOUT"})),
      icon: [
        "M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z",
        "M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z",
      ],
    },
  ];

  return (
    <div className="group relative">
      <button
        type="button"
        ref={buttonRef}
        onClick={toggleMenu}
        className="flex items-center justify-center ml-auto text-white rotate-90 outline-none duration-200 focus:scale-105"
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
        <span className="sr-only">Qo'shimcha parametrlar</span>
      </button>

      {isMenuOpen && (
        <div className="absolute left-3 bottom-11 shadow-xl" ref={dropdownRef}>
          <div
            id="speed-dial-menu-dropdown"
            className="flex flex-col justify-end py-1 space-y-2 w-48 bg-white border border-gray-100 rounded-lg rounded-bl-none shadow-sm dark:border-gray-600 dark:bg-gray-700"
          >
            <ul className="text-sm text-gray-500 dark:text-gray-300">
              {menuItems?.map((item, index) => (
                <li key={String(index)} onClick={item?.onClick}>
                  <p
                    className="flex items-center px-3 py-2 cursor-pointer outline-none hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-white focus:text-blue-600"
                  >
                    <svg
                      className="text-sm w-3.5 h-3.5 mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      {item?.icon?.map((icon, idx) => (
                        <path key={String(idx)} d={icon} />
                      ))}
                    </svg>
                    <span className="text-sm font-medium">{item?.label}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}