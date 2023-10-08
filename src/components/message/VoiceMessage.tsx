import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

// Helpers
import { getCurrentAudio } from "@helpers/muxlisaAIAPI";

// Types
import { IMessageConfigs } from "../../types";
interface IMessage {
  message: IMessageConfigs;
  isUser: boolean;
  rounded: "rounded-bl-xl" | "rounded-br-xl";
}

export default function VoiceMessage({ message, isUser, rounded }: IMessage) {
  const currentAudioRef = useRef<HTMLAudioElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [audioSuccess, setAudioSuccess] = useState<boolean>(false);

  async function onAudioClick() {
    setLoading(true);
    const response = await getCurrentAudio(currentAudioRef, message?.value || "");
    setAudioSuccess(response);
    setLoading(false);
    
    const audios = Cookies.get("$text$to$voice$audios$") ? JSON.parse(Cookies.get("$text$to$voice$audios$")!) : [];

    audios.push({
      id: message?.id || "",
      value: currentAudioRef?.current?.src || "",
    })

    Cookies.set("$text$to$voice$audios$", JSON.stringify(audios))
  }

  useEffect(() => {
    if(Cookies.get("$text$to$voice$audios$")) {
      const audios = JSON.parse(Cookies.get("$text$to$voice$audios$")!) || [];
      
      audios?.map((audio: IMessageConfigs) => {
        if(audio?.id === message?.id) {
          if(!currentAudioRef?.current) return;
            getCurrentAudio(currentAudioRef, message?.value || "");
            setAudioSuccess(true);
        }
      })
    }
  }, [])

  return (
    <div className="relative w-max sm:my-5 my-2.5">
      <audio
        controls
        ref={currentAudioRef}
        className={`${isUser ? "self-end sm:mr-9 mr-3" : "self-start sm:ml-9 ml-3"} block max-w-[255px] p-3 text-gray-600 dark:text-gray-300 bg-gray-100 border border-gray-200 rounded-t-xl ${rounded} shadow outline-none hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
      >
        <source type="audio/*" />
        Brauzeringiz audio elementini qo'llab-quvvatlamaydi.
      </audio>
      {!audioSuccess && <div onClick={onAudioClick} className={`absolute top-0 ${isUser ? "self-end sm:rigth-9 rigth-3" : "self-start sm:left-9 left-3"} w-[255px] h-[76px] grid place-items-center rounded-t-xl ${rounded} bg-opacityWhite dark:bg-opacityDark`}>
        {
          !loading ? 
            <i className="fa-solid fa-download text-3xl text-gray-600 dark:text-gray-300 absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2" /> 
              :
              <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
              <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-600 dark:text-gray-300 animate-spin fill-darker" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
              <span className="sr-only">Yuklanmoqda...</span>
            </div>
        }
      </div>}
      <p className="absolute bottom-[2px] right-3 text-xxs">{message?.date}</p>
    </div>
  );
}