import React, { useEffect, useRef } from "react";

interface IInput {
  value: string;
  onChange: (param: string) => void;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Input({ value, onChange, handleSubmit }: IInput) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current && textareaRef.current.scrollHeight <= 105) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="w-full h-20 max-h-20 flex items-center pl-1 pr-2 border-t-2">
      <textarea
        id="chat"
        rows={1}
        ref={textareaRef}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        placeholder="Xabar yuborish..."
        className="block mx-4 p-3 my-5 w-full min-h-[50px] h-[50px] resize-none text-base font-medium outline-none text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></textarea>
      <button
        type="submit"
        disabled={!value.trim() || value.length > 500}
        onClick={handleSubmit}
        className={`relative inline-flex justify-center p-2 pl-0 rounded-full ${value.length > 500 ? 'text-red-600 dark:text-red-500' : 'cursor-pointer text-blue-600 dark:text-blue-500'} outline-none duration-300 focus:scale-125`}
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
      {value.length > 500 && <span className="absolute text-xs text-red-600 font-extralight font-mono right-1 bottom-0 shadow-lg shadow-gray-900">{value.length}/500</span>}
    </div>
  );
}