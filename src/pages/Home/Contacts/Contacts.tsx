import { useState } from "react";
import { PiUsersThree } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

import ContactList from "./ContactList";
import { useAppDispatch } from "../../../utils/hooks";
import TextTranslate from "../../../utils/TextTranslate";
import { useTheme } from "../../../context/ThemeProvider";
import { useTranslateText } from "../../../hooks/useTranslateText";
import { useWebsiteSettings } from "../../../store/api/useWebsiteSettings";
import { updateCreateGroupData } from "../../../store/Slices/CreateGroupSlice";

export default function Contacts() {
  const [searchUser, setsearchUser] = useState("");
  // @ts-ignore
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { data: websiteSettings } = useWebsiteSettings();
  const translate = useTranslateText();

  return (
    <div className="relative flex h-screen w-full flex-col overflow-y-auto overflow-x-hidden pb-6 shadow-inner lg:max-w-md bg-primary ">
      <div className="w-full px-4">
        <div className="mb-10 flex items-center gap-3 pt-10 font-semibold">
          <FaChevronLeft
            className="cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
          <span className="text-lg font-semibold">
            <TextTranslate text="New Chat" />
          </span>
        </div>

        <div className="relative my-4 h-fit">
          <IoSearchOutline className="absolute left-3 top-2 text-2xl text-lightText" />
          <input
            value={searchUser}
            onChange={(e) => {
              setsearchUser(e.target.value);
            }}
            className={` ${theme == "dark" ? "bg-transparent" : "bg-[#F2F2F2]"
              } w-full rounded-xl border border-borderColor py-2 pl-11 placeholder-lightText outline-none`}
            type="text"
            placeholder={translate("Search User")}
          />
        </div>

        <hr className="border-t border-borderColor" />
        <div
          onClick={() => {
            dispatch(updateCreateGroupData({ createNewGroup: true }));
            navigate("/add-member-to-group");
          }}
          className={`flex cursor-pointer items-center px-3 py-4 hover:bg-selectedChat`}
        >
          <div className="relative mr-3 grid h-14 w-14 place-content-center rounded-full bg-[#FDE693] text-black 2xl:h-12 2xl:w-12">
            <PiUsersThree className="h-5 w-5 object-cover 2xl:h-7 2xl:w-7" />
          </div>
          <div className="text-base font-medium capitalize text-darkText">
            <TextTranslate text="New Group" />
          </div>
        </div>
        <hr className="border-t border-borderColor" />
      </div>
      <h4 className="mt-4 px-3 text-xl font-medium">
        <TextTranslate text="Contact on" />{" "}
        <TextTranslate text={websiteSettings?.settings[0].website_name!} />
      </h4>
      <ContactList searchUser={searchUser} />
    </div>
  );
}
