// @ts-nocheck
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// components
import ThemeToggleButton from "./ThemeToggle";
import LogoutModal from "./Settings/LogOutModal";

// utils and context
import { useAppDispatch } from "../../utils/hooks";
import { useTheme } from "../../context/ThemeProvider";
import { removeMessageList } from "../../store/Slices/MessageListSlice";
import { useWebsiteSettings } from "../../store/api/useWebsiteSettings";
import { ChartPie, LogOut, MessageSquareText, Phone, Settings, UserRound, Users } from "lucide-react";

export default function Sidebar() {
  const { theme } = useTheme();
  let dispatch = useAppDispatch();
  let location = useLocation();
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  let { data: websiteSettings } = useWebsiteSettings();

  return (
    <>
      <div className="fixed hidden h-screen min-w-24 flex-col justify-between bg-primary py-10 text-darkText shadow-xl lg:flex 2xl:min-w-28">
        <div className="bgGradient flex flex-col items-center gap-7">
          <NavLink to={"/profile"} className="cursor-pointer">
            <UserRound size={22} className={`${location.pathname === "/profile" ? "text-rose-500" : ""}`} />
          </NavLink>
          <NavLink to={"/chat"} className="cursor-pointer" >
            <MessageSquareText size={22} className={`${location.pathname === "/chat" ? "text-rose-500" : ""}`} />
          </NavLink>
          {/* <NavLink to={"/status"} className="cursor-pointer">
            <ChartPie size={22} className={`${location.pathname === "/status" ? "text-rose-500" : ""}`} />
          </NavLink> */}
          {/* <NavLink to={"/contact-list"} className="cursor-pointer">
            <Users size={22} className={`${location.pathname === "/contact-list" ? "text-rose-500" : ""}`} />
          </NavLink> */}
          <NavLink to={"/call-history"} className="cursor-pointer">
            <Phone size={22} className={`${location.pathname === "/call-history" ? "text-rose-500" : ""}`} />
          </NavLink>
          <NavLink to={"/setting"} className="cursor-pointer">
            <Settings size={22} className={`${location.pathname === "/setting" ? "text-rose-500" : ""}`} />
          </NavLink>
        </div>
        <div className="flex flex-col items-center gap-7">
          <ThemeToggleButton />
          <LogoutModal
            isOpen={showLogOutModal}
            setIsOpen={setShowLogOutModal}
          />
          <button
            onClick={() => {
              setShowLogOutModal(true);
            }}
          >
            <img
              className="h-6"
              src={`${theme === "dark" ? "/DarkIcons" : "/LightIcons"
                }/logout.png`}
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="hidden min-w-24 lg:flex 2xl:min-w-28"></div>
    </>
  );
}
