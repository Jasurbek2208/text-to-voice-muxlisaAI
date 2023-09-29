import { myAxios } from "../service/axios";

// Types
import { IVerifyAccountParams } from "../types/types";
import { refreshedNavigate } from "./refreshedNavigate";

export async function verifyAccount(params: IVerifyAccountParams) {
  try {
    const response = await myAxios.post("/auth/verify", params);
    return response?.data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data;
  }
}
AbortController
export async function requestToSendVerify(email: string) {
  const formData = new FormData();
  formData.append(
    "email",
    email || localStorage.getItem("success-registered") || ""
  );
  refreshedNavigate("/success-registered");

  try {
    await myAxios.post("/auth/sendVerify", formData);
  } catch {
    return "Texnik xato yuz berdi! Qayta urinib ko'ring!";
  }
}
