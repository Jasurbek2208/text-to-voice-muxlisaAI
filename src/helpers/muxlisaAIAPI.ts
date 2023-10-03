import { myAxios } from "@service/axios";
import { RefObject } from "react";

export async function getHistory(historyType: 1 | 2, userId: string) {
  try {
    const response = await myAxios.get(`/muxlisaAI/user-history/${userId}/?history-type=${historyType}`);
    
    return response?.data?.textToVoiceHistory;
  } catch (error) {
    console.log(error);
  }
}

export async function clearHistory(type: "text-to-voice" | "voice-to-text", userId: string) {
  try {
    const response = await myAxios.delete(`/muxlisaAI/${type}/clear-history/${userId}`);
    console.log(response);

  } catch (error) {
    console.log(error);
  }
}

export async function addHistory(type: "text-to-voice" | "voice-to-text", userId: string, history_link: string) {
  try {
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("history_link", history_link);

    const response = await myAxios.post(`/muxlisaAI/${type}/add-history`, formData);
    console.log(response);

  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentAudio(currentAudioRef: RefObject<HTMLAudioElement>, audioId: string) {
  try {
    const response = await myAxios.get(`/muxlisaAI/current-audio/${audioId}`, { responseType: 'arraybuffer' })
    const blob = new Blob([response?.data], { type: 'audio/ogg' });
    const audioUrl = URL.createObjectURL(blob);
    
    if(currentAudioRef.current) {
      currentAudioRef.current.src = audioUrl;
      // currentAudioRef.current.play();
    }
    return true;
    
  } catch (error) {
    console.log(error);
    
    return false;
  }
}