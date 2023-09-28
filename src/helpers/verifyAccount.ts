import { myAxios } from "../service/axios";

export async function verifyAccount(verifyId: string) {
  try {
    const response = await myAxios.get('/auth/verify', { headers: { Authorization: verifyId } });
    return response?.data;
    
  } catch (error) {
    console.log(error);
  }
}