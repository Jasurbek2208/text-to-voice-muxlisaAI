import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearTextToVoiceHistory } from '../../store/store';

export default function DropDown() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Clear', onClick: () => dispatch(clearTextToVoiceHistory({ type: "CLEAR_HISTORY" })), icon: ["M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z", "M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"] },
    { label: 'Add DB', icon: ["M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z", "M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"] },
    { label: 'Copy DB', icon: ["M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z", "M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"] },
  ];

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={toggleMenu}
        className="flex items-center justify-center ml-auto text-white rotate-90 outline-none duration-200 focus:scale-125"
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
        <span className="sr-only">Open actions menu</span>
      </button>

      {isMenuOpen && (
        <div className="absolute left-3 bottom-11 shadow-xl">
          <div
            id="speed-dial-menu-dropdown"
            className="flex flex-col justify-end py-1 space-y-2 w-28 bg-white border border-gray-100 rounded-lg rounded-bl-none shadow-sm dark:border-gray-600 dark:bg-gray-700"
          >
            <ul className="text-sm text-gray-500 dark:text-gray-300">
              {menuItems.map((item, index) => (
                <li key={index} onClick={item?.onClick}>
                  <a
                    href="#"
                    className="flex items-center px-3 py-2 outline-none hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-white focus:text-blue-600"
                  >
                    <svg
                      className="w-3.5 h-3.5 mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                        {item.icon.map((icon, idx) => <path key={String(idx)} d={icon} /> )}
                    </svg>
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};