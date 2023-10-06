import React from "react";

// Types
import { IMessageConfigs } from "../../types";

interface IMessage {
  message: IMessageConfigs;
  isUser: boolean;
  rounded: 'rounded-bl-xl' | 'rounded-br-xl';
}

export default function Message({ message, isUser, rounded }: IMessage) {
  return (
    <div className={`${isUser ? 'self-end sm:mr-9 mr-3' : 'self-start sm:ml-9 ml-3'} block sm:max-w-sm max-w-[90%] min-w-[70px] w-max p-2.5 sm:my-5 my-2.5 bg-gray-100 border border-gray-200 rounded-t-xl ${rounded} shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
      <p className="whitespace-break-spaces break-words font-normal text-lg text-gray-700 dark:text-gray-400">{message?.value}</p>
      <p className="text-xxs text-right">{message?.date}</p>
    </div>
  );
}