import { API_URL } from "@/config/constants";
import axios from "axios";

export const sendChatAPI = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/chat`, data, {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 200) {
      throw Error("Error sending chat");
    }

    return response.data;
  } catch (error) {
    console.error("Error sending chat:", error);
    throw Error("Error sending chat");
  }
};
