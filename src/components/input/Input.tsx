import React, { useEffect, useRef } from "react";

// Components
import DropDown from "../dropDown/DropDown";

interface IInput {
  value: string;
  onChange: (param: string) => void;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Input({ value, onChange, handleSubmit }: IInput) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef?.current && textareaRef?.current?.scrollHeight <= 105) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef?.current?.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="bg-[rgba(247,247,248,1)] dark:bg-dark w-full h-20 max-h-20 border-t-2 duration-300">
      {/* DropDown */}
      <div className="max-w-[900px] mx-auto flex items-center pr-2 ">
        <DropDown />
        <textarea
          id="chat"
          rows={1}
          ref={textareaRef}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e?.target?.value)}
          placeholder="Xabar yuborish..."
          className="block mx-4 ml-1 p-3 my-5 w-full min-h-[50px] h-[50px] resize-none text-base font-medium outline-none text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 duration-300"
        ></textarea>
        <button
          type="submit"
          disabled={!value?.trim() || value?.length > 500}
          onClick={handleSubmit}
          className={`relative inline-flex justify-center p-2 pl-0 rounded-full ${value?.length > 500 ?'cursor-default text-red-600 dark:text-red-500' : value?.length === 0 || !value?.trim() ? 'cursor-default text-blue-600 dark:text-blue-500' : 'cursor-pointer text-blue-600 dark:text-blue-500'} outline-none focus:scale-105 duration-300`}
        >
          <svg
            className="w-5 h-5 rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
          <span className="sr-only">Xabar yuborish</span>
        </button>
        {value?.length > 500 && <div className={`absolute right-2 bottom-3 w-[40px] flex justify-center text-red-600 font-extralight font-mono text-xs duration-300`}>-{value?.length - 500}</div>}
      </div>
    </div>
  );
}