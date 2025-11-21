import { NavLink, useLocation } from "react-router-dom";

// utils and context
import { useAppDispatch } from "../../utils/hooks";
import { useTheme } from "../../context/ThemeProvider";
import { updateViewState } from "../../store/Slices/ViewManagerSlice";
import { Heart, MessageSquareText, Search, Settings, Users } from "lucide-react";
import { resetCurrentConversation } from "../../store/Slices/CurrentConversationSlice";
import TextTranslate from "../../utils/TextTranslate";

export default function Bottombar() {
  // @ts-ignore
  const { theme } = useTheme();
  let dispatch = useAppDispatch();
  let location = useLocation();

  return (
    <div
      onClick={() => {
        dispatch(updateViewState({ show_chats_sidebar: true }));
        dispatch(resetCurrentConversation());
      }}
      className="fixed bottom-0 z-50 flex w-full items-center justify-between bg-primary py-4 lg:hidden px-4"
    >
      <NavLink to={`${import.meta.env.VITE_FRONTEND_URL}dashboard/`} className="flex items-center justify-center flex-col cursor-pointer space-y-1">
        <Search size={18} className="text-gray-700" />
        <p className="text-gray-500 text-sm">
          <TextTranslate text="Discover" />
        </p>
      </NavLink>
      <NavLink to={`${import.meta.env.VITE_FRONTEND_URL}dashboard/matches`} className="flex items-center justify-center flex-col cursor-pointer space-y-1">
        <Heart size={18} className="text-gray-700" />
        <p className="text-gray-500 text-sm">
          <TextTranslate text="Match" />
        </p>
      </NavLink>
      <NavLink to={"/chat"} className="flex items-center justify-center flex-col cursor-pointer space-y-1">
        <MessageSquareText size={18} className={`${location.pathname === "/chat" ? "text-rose-500" : "text-gray-700"}`} />
        <p className={`text-sm ${location.pathname === "/chat" ? "text-rose-500" : "text-gray-700"}`}>
          <TextTranslate text="Chats" />
        </p>
      </NavLink>
      <NavLink to={"/contact-list"} className="flex items-center justify-center flex-col cursor-pointer space-y-1">
        <Users size={18} className={`${location.pathname === "/contact-list" ? "text-rose-500" : "text-gray-700"}`} />
        <p className={`text-sm ${location.pathname === "/contact-list" ? "text-rose-500" : "text-gray-700"}`}>
          <TextTranslate text="Contacts" />
        </p>
      </NavLink>
      {/* <NavLink to={"/call-history"} className="flex items-center justify-center flex-col cursor-pointer space-y-1">
        <Phone size={18} className={`${location.pathname === "/call-history" ? "text-rose-500" : ""}`} />
        <p className="text-gray-500 text-sm">Calls</p>
      </NavLink> */}
      <NavLink to={"/setting"} className="flex items-center justify-center flex-col cursor-pointer space-y-1">
        <Settings size={18} className={`${location.pathname === "/setting" ? "text-rose-500" : "text-gray-700"}`} />
        <p className={`text-sm ${location.pathname === "/setting" ? "text-rose-500" : "text-gray-700"}`}>
          <TextTranslate text="Setting" />
        </p>
      </NavLink>
    </div>
  );
}
