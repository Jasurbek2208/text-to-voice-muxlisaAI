import { myAxios } from "../service/axios";

export async function clearHistory(type: "text-to-voice" | "voice-to-text", user_id: string) {
  try {
    const response = await myAxios.delete(`/muxlisaAI/${type}/clear-history/${user_id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export async function addHistory(type: "text-to-voice" | "voice-to-text", user_id: string, history_link: string) {
  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("history_link", history_link);

  try {
    const response = await myAxios.post(`/muxlisaAI/${type}/add-history`, formData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}