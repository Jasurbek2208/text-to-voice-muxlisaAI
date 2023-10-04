import React, { useEffect, useRef, useState } from "react";
import { myAxios } from "@service/axios";

// Variables
import { BORDER_BOTTOM_LEFT, BORDER_BOTTOM_RIGHT } from "../../variables";

// Redux Store
import { useDispatch } from "react-redux";
import {
  textToVoiceHistoryAdd,
  textToVoiceHistoryChange,
} from "@store/store";
import { useTypedSelector } from "@hooks/reduxSelector";

// Components
import Input from "@components/input/Input";
import Navbar from "@components/navbar/Navbar";
import Message from "@components/message/Message";
import VoiceMessage from "@components/message/VoiceMessage";

// Helpers
import { getHistory, getFullTime, scrollToBottom } from "@helpers/index";

// Types
import { ITextToVoiceHistory } from "../../types";

export default function TextToVoice() {
  const dispatch = useDispatch();
  const {
    user: { userId },
    textToVoiceHistory, AIVoiceGender
  } = useTypedSelector((s) => s?.store);

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

  const handleSubmit = async () => {
    const data: ITextToVoiceHistory = {
      _id: String(new Date()?.getTime()),
      request: {
        date: getFullTime(),
        value: text?.trim(),
      },
      response: {
        date: getFullTime(),
        value: "",
      },
    };

    handleChange("");
    await generateTextToVoice(data);

    dispatch(textToVoiceHistoryChange(data));
  };

  async function generateTextToVoice(data: ITextToVoiceHistory) {
    const formData = new FormData();
    formData.append("speaker_id", AIVoiceGender === "Male" ? "1" : "0");
    formData.append("text", data?.request?.value);
    formData.append("userRequestTime", getCurrentTime());
    formData.append("userId", userId);

    try {
      const { data: response} = await myAxios.post(
        "/muxlisaAI/text-to-voice",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      data.response.value = (response as ITextToVoiceHistory)?.response?.value;
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-h-dvh h-dvh overflow-hidden">
      <Navbar />
      <div
        ref={contentRef}
        className="w-full py-5 max-h-messagesH h-full overflow-y-scroll scroll-no-width"
      >
        {textToVoiceHistory &&
          textToVoiceHistory?.map((message: ITextToVoiceHistory) => (
            <div
              key={message?._id}
              className="flex flex-col sm:gap-10 gap-7 w-full sm:mt-10 mt-7"
            >
              <Message
                message={message?.request}
                isUser={true}
                rounded={BORDER_BOTTOM_LEFT}
              />
              <VoiceMessage
                message={message?.response}
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
