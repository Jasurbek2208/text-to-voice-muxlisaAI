import React from "react";

// Types
import { IMessageConfigs } from "../../types/types";

interface IMessage {
  message: IMessageConfigs;
  isUser: boolean;
  rounded: 'rounded-bl-xl' | 'rounded-br-xl';
}

export default function VoiceMessage({ message, isUser, rounded }: IMessage) {
  return (
    <audio controls className={`${isUser ? 'self-end sm:mr-9 mr-3' : 'self-start sm:ml-9 ml-3'} block sm:max-w-xs max-w-[60%] w-full p-2.5 bg-gray-100 border border-gray-200 rounded-t-xl ${rounded} shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
      <source src={message?.value || "audio"} type="audio/*" />
        Brauzeringiz audio elementini qo'llab-quvvatlamaydi.
    </audio>
  )
}