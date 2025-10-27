import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { useAppDispatch } from "../../utils/hooks";
import { updateChatList } from "../Slices/ChatListSlice";
import { ChatListRes } from "../../types/ChatListType";

export const useChatList = ({ full_name }: { full_name?: string }) => {
  const token = Cookies.get("whoxa_auth_token");
  const dispatch = useAppDispatch();

  return useQuery<ChatListRes, Error>(
    ["my-chat-lists", full_name],
    async () => {
      const response = await axios.post<ChatListRes>(
        `${import.meta.env.VITE_API_URL}my-chat-lists`,
        { full_name }, // ✅ send the body if backend expects it
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Chat list DATA:::", response.data.chatList);
      dispatch(updateChatList(response.data.chatList));

      return response.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
