import { myAxios } from "../service/axios";

export async function getHistory(historyType: 1 | 2, userId: string) {
  try {
    const response = await myAxios.get(`/muxlisaAI/user-history/${userId}/?history-type=${historyType}`);
    console.log(response);
    
    return response.data.textToVoiceHistory;
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
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("history_link", history_link);

  try {
    const response = await myAxios.post(`/muxlisaAI/${type}/add-history`, formData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}