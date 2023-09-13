import React from "react";

interface IMessage {
  text: string;
  isUser: boolean;
}
// ${isUser ? ' rounded-br-none ' : ' rounded-bl-none '}
export default function Message({ text, isUser }: IMessage) {
  return (
    <div className={`${isUser ? 'self-end sm:mr-9 mr-3' : 'self-start sm:ml-9 ml-3'} block sm:max-w-sm max-w-full w-[85%] p-2.5 bg-white border border-gray-200 rounded-xl rounded-${isUser ? 'br' : 'bl'}-none shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
      <p className="font-normal text-gray-700 dark:text-gray-400">{text}</p>
    </div>
  );
}