import React, { useEffect, useRef, useState } from "react";
import { myAxios } from "../../service/axios";

// Variables
import { BORDER_BOTTOM_LEFT, BORDER_BOTTOM_RIGHT } from "../../variables";

// Redux Store
import { useDispatch } from "react-redux";
import {
  textToVoiceHistoryAdd,
  textToVoiceHistoryChange,
} from "../../store/store";
import { useTypedSelector } from "../../hooks/reduxSelector";

// Components
import Input from "../../components/input/Input";
import Navbar from "../../components/navbar/Navbar";
import Message from "../../components/message/Message";
import VoiceMessage from "../../components/message/VoiceMessage";

// Helpers
import { getHistory } from "../../helpers/muxlisaAI";
import { getFullTime } from "../../helpers/getFullTime";
import { scrollToBottom } from "../../helpers/scrollToBottom";

// Types
import { ITextToVoiceHistory } from "../../types/types";

export default function TextToVoice() {
  const dispatch = useDispatch();
  const { user: { userId }, textToVoiceHistory } = useTypedSelector((s) => s?.store);

  const contentRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("");

  const handleChange = (param: string) => {
    if (param?.length - 500 > 4999) return;
    setText(param);
  };

  function getCurrentTime() {
    const currentDate = new Date();
    const isoDate = currentDate?.toISOString();
    return isoDate;
  }

  useEffect(() => {
    scrollToBottom(contentRef);
  }, [textToVoiceHistory]);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      const response = await getHistory(1, userId);
      dispatch(textToVoiceHistoryAdd(response));
    })();
  }, [userId]);

  const handleSubmit = () => {
    const data: ITextToVoiceHistory = {
      id: String(new Date()?.getTime()),
      request: {
        date: getFullTime(),
        value: text?.trim(),
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
    formData.append("text", data?.request?.value);
    formData.append("userRequestTime", getCurrentTime());
    formData.append("user_id", "1690287141925");

    try {
      const response = await myAxios.post(
        "/muxlisaAI/text-to-voice",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-[100%] overflow-hidden">
      <Navbar />
      <div
        ref={contentRef}
        className="w-full py-5 max-h-messagesH h-[100%] overflow-y-scroll scroll-no-width"
      >
        {textToVoiceHistory &&
          textToVoiceHistory?.map((message: ITextToVoiceHistory) => (
            <div
              key={message?.id}
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