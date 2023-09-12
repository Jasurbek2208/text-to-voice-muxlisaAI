import React, { useEffect, useRef, useState } from "react";

export default function Input() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="fixed bottom-0 w-full flex items-center pl-1 pr-2 py-4 border-t-2">
      <textarea
        id="chat"
        rows={1}
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        style={{ resize: "none", minHeight: "50px" }}
        placeholder="Your message..."
        className="block mx-4 p-2.5 w-full text-base font-semibold outline-none text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></textarea>
      <button
        type="submit"
        className="inline-flex justify-center p-2 pl-0 text-blue-600 rounded-full cursor-pointer dark:text-blue-500"
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
        <span className="sr-only">Send message</span>
      </button>
    </div>
  );
}