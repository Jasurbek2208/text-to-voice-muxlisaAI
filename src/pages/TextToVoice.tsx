import React, { useState } from "react";
import { myAxios } from "../service/axios";

// Redux Store
import { useDispatch } from "react-redux";
import { textToVoiceHistoryChange } from "../store/store";
import { useTypedSelector } from "../hooks/reduxSelector";

// Components
import Input from "../components/input/Input";
import Navbar from "../components/navbar/Navbar";
import Message from "../components/message/Message";

// Helpers
import { getFullTime } from "../helpers/getFullTime";

// Types
import { ITextToVoiceHistory } from "../types/types";

export default function TextToVoice() {
  const dispatch = useDispatch();
  const { textToVoiceHistory } = useTypedSelector((s) => s.store);

  const [text, setText] = useState<string>("");

  const handleChange = (param: string) => {
    setText(param);
  };

  const handleSubmit = () => {
    const data: ITextToVoiceHistory = {
      id: String(new Date().getTime()),
      request: {
        date: getFullTime(), 
        value: text.trim()
      },
      response: {
        date: getFullTime(), 
        value: "AI javobini olishda xatolik yuz berdi!"
      },
    };
    
    handleChange('');
    // generateTextToVoice(data);

    dispatch(textToVoiceHistoryChange(data));
  };

  async function generateTextToVoice(data: ITextToVoiceHistory) {
    const formData  = new FormData();
    formData.append('token', "2tS3A-ceAkJFUFnLsxXaEQ");
    formData.append('text', data.request.value);
    formData.append('speaker_id', '1');

    try {
      const res = await myAxios.post('/tts/', formData);
      console.log(JSON.stringify(res))
      console.log(JSON.stringify(res.data))
      
      const audios = JSON.parse(localStorage.getItem('audios')!)
      audios.push(res)
      audios.push(res.data)
      // console.log(audios);
      
      localStorage.setItem('audios', JSON.stringify(audios))
      localStorage.setItem('audiosFile', JSON.stringify(res))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-h-[100vh] h-[100%] overflow-hidden">
      <Navbar />
      <div className="w-full py-5 max-h-messagesH h-[100%] overflow-y-scroll scroll-no-width">
        {/* <audio controls>
          <source src={JSON.stringify(JSON.parse(localStorage.getItem('audios')!)[8])} type="audio/*" />
          Your browser does not support the audio element.
        </audio> */}
        {textToVoiceHistory && textToVoiceHistory.map((message) => 
          <div key={message.id} className="flex flex-col sm:gap-10 gap-7 w-full sm:mt-10 mt-7">
            <Message message={message.request} isUser={true} />
            <Message message={message.response} isUser={false} />
          </div> 
        )}
      </div>
      <Input value={text} onChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}