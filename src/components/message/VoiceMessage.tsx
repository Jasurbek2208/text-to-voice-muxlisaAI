import { getCurrentAudio } from "@helpers/muxlisaAIAPI";
import React, { useEffect, useRef, useState } from "react";

// Types
import { IMessageConfigs } from "../../types";

interface IMessage {
  message: IMessageConfigs;
  isUser: boolean;
  rounded: 'rounded-bl-xl' | 'rounded-br-xl';
}

export default function VoiceMessage({ message, isUser, rounded }: IMessage) {
  const currentAudioRef = useRef<HTMLAudioElement>(null);
  const [audioStream, setAudioStream] = useState(new Audio('YOUR_AUDIO_STREAM_URL'));
  
  useEffect(() => {
    console.log(currentAudioRef);

  },[currentAudioRef])
  

  return (
    <>
      <div className={`${isUser ? 'self-end sm:mr-9 mr-3' : 'self-start sm:ml-9 ml-3'} block sm:max-w-xs max-w-[60%] w-full p-3 bg-gray-100 border border-gray-200 rounded-t-xl ${rounded} shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
      {/* <div onClick={() => getCurrentAudio(currentAudioRef, message?.value || "")}>Get this audio</div> */}

        <div className="flex items-center justify-between">
          <audio ref={currentAudioRef}>
            <source src={message?.value || "audio"} type="audio/*" />
              Brauzeringiz audio elementini qo'llab-quvvatlamaydi.
          </audio>
          <div className="w-5 h-5 bg-dark cursor-pointer" onClick={() => !currentAudioRef?.current?.src ? getCurrentAudio(currentAudioRef, message?.value || "") : null}></div>

          <span className="text-neutral-900">{currentAudioRef?.current?.currentTime || "0:00"} / {currentAudioRef?.current?.duration || "0:00"}</span>


          <div className="p-1.5 transition hover:bg-zinc-200 rounded-full">
            <div className="three-dost w-5 h-5 cursor-pointer"></div>
          </div>
        </div>

        <progress className="m-0 w-full rounded-full cursor-pointer" value="5" max="8"></progress>

      </div>
    </>
  )
}