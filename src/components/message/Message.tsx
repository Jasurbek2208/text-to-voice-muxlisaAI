import React from "react";

// Types
import { IMessageConfigs } from "../../types/types";

interface IMessage {
  message: IMessageConfigs;
  isUser: boolean;
}

export default function Message({ message, isUser }: IMessage) {
  return (
    <div className={`${isUser ? 'self-end sm:mr-9 mr-3' : 'self-start sm:ml-9 ml-3'} block sm:max-w-sm max-w-[90%] w-max p-2.5 bg-gray-100 border border-gray-200 rounded-xl rounded-${isUser ? 'br' : 'bl'}-none shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
      <p className="whitespace-break-spaces break-words font-normal text-gray-700 dark:text-gray-400">{message.value}</p>
    </div>
  );
}