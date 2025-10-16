import { NavLink, useLocation } from "react-router-dom";

// utils and context
import { useAppDispatch } from "../../utils/hooks";
import { useTheme } from "../../context/ThemeProvider";
import { updateViewState } from "../../store/Slices/ViewManagerSlice";
import { Home, MessageSquareText, Phone, Settings, Users } from "lucide-react";
import { resetCurrentConversation } from "../../store/Slices/CurrentConversationSlice";

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
      className="fixed bottom-0 z-50 flex w-full items-center justify-evenly bg-primary py-4 lg:hidden"
    >
      <NavLink to={"http://localhost:5175/dashboard/"} className="flex items-center justify-center flex-col cursor-pointer space-y-1">
        <Home size={16} />
        <p className="text-xs text-gray-500 text-sm">Home</p>
      </NavLink>
      <NavLink to={"/chat"} className="flex items-center justify-center flex-col cursor-pointer space-y-1">
        <MessageSquareText size={16} className={`${location.pathname === "/chat" ? "text-rose-500" : ""}`} />
        <p className="text-xs text-gray-500 text-sm">Chats</p>
      </NavLink>
      <NavLink to={"/contact-list"} className="flex items-center justify-center flex-col cursor-pointer space-y-1">
        <Users size={16} className={`${location.pathname === "/contact-list" ? "text-rose-500" : ""}`} />
        <p className="text-xs text-gray-500 text-sm">Contacts</p>
      </NavLink>
      <NavLink to={"/call-history"} className="flex items-center justify-center flex-col cursor-pointer space-y-1">
        <Phone size={16} className={`${location.pathname === "/call-history" ? "text-rose-500" : ""}`} />
        <p className="text-xs text-gray-500 text-sm">Calls</p>
      </NavLink>
      <NavLink to={"/setting"} className="flex items-center justify-center flex-col cursor-pointer space-y-1">
        <Settings size={16} className={`${location.pathname === "/setting" ? "text-rose-500" : ""}`} />
        <p className="text-xs text-gray-500 text-sm">Settings</p>
      </NavLink>
    </div>
  );
}
