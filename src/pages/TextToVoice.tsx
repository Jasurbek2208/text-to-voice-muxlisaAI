import React, { useEffect, useState } from "react";
import { myAxios } from "../service/axios";

// Variables
import { BORDER_BOTTOM_LEFT, BORDER_BOTTOM_RIGHT } from "../variables";

// Redux Store
import { useDispatch } from "react-redux";
import { textToVoiceHistoryChange } from "../store/store";
import { useTypedSelector } from "../hooks/reduxSelector";

// Components
import Input from "../components/input/Input";
import Navbar from "../components/navbar/Navbar";
import Message from "../components/message/Message";
import VoiceMessage from "../components/message/VoiceMessage";

// Helpers
import { getFullTime } from "../helpers/getFullTime";

// Types
import { ITextToVoiceHistory } from "../types/types";

export default function TextToVoice() {
  const dispatch = useDispatch();
  const { textToVoiceHistory } = useTypedSelector((s) => s.store);

  const [text, setText] = useState<string>("");

  const handleChange = (param: string) => {
    if (param.length - 500 > 4999) return;
    setText(param);
  };

  function getCurrentTime() {
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();
    return isoDate;
  }

  useEffect(() => {
    if (localStorage.getItem("newAudios")) {
      const data: any = localStorage.getItem("newAudios");
      const newData = JSON.parse(data);
      console.log(newData);

      newData.map((data: any) => {
        dispatch(textToVoiceHistoryChange(data));
      });
    }
  }, []);

  const handleSubmit = () => {
    const data: ITextToVoiceHistory = {
      id: String(new Date().getTime()),
      request: {
        date: getFullTime(),
        value: text.trim(),
      },
      response: {
        date: getFullTime(),
        value: "AI javobini olishda xatolik yuz berdi!",
      },
    };

    handleChange("");
    generateTextToVoice(data);

    dispatch(textToVoiceHistoryChange(data));
  };

  async function generateTextToVoice(data: ITextToVoiceHistory) {
    const formData = new FormData();
    formData.append("speaker_id", "1");
    formData.append("text", data.request.value);
    formData.append("userRequestTime", getCurrentTime());
    formData.append("user_id", "1690287141925 ");

    try {
      const response = await myAxios.post("/muxlisaAI/text-to-voice", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const audios = JSON.parse(localStorage.getItem("newAudios")!);
      audios.push(response.data);

      localStorage.setItem("newAudios", JSON.stringify(audios));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-[100%] overflow-hidden">
      <Navbar />
      <div className="w-full py-5 max-h-messagesH h-[100%] overflow-y-scroll scroll-no-width">
        {/* {audio && (
          <audio controls>
            <source src={audio} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        )} */}
        {textToVoiceHistory &&
          textToVoiceHistory.map((message, idx) => (
            <div
              key={String(message?.id + "-" + idx)}
              className="flex flex-col sm:gap-10 gap-7 w-full sm:mt-10 mt-7"
            >
              <Message
                message={message?.request}
                isUser={true}
                rounded={BORDER_BOTTOM_LEFT}
              />
              <VoiceMessage
                message={textToVoiceHistory[0]?.request}
                isUser={false}
                rounded={BORDER_BOTTOM_RIGHT}
              />
            </div>
          ))}
      </div>
      <Input value={text} onChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}
