import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

import ContactList from "./ContactList";
import TextTranslate from "../../../utils/TextTranslate";
import { useTheme } from "../../../context/ThemeProvider";
import { useTranslateText } from "../../../hooks/useTranslateText";

export default function Contacts() {
  const [searchUser, setsearchUser] = useState("");
  // @ts-ignore
  const { theme } = useTheme();
  const navigate = useNavigate();
  const translate = useTranslateText();

  const queryParams = new URLSearchParams(location.search);
  const fullname = queryParams.get("id");


  useEffect(() => {
    if (fullname) {
      setsearchUser(fullname)
    }
  }, []);

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
            <TextTranslate text="Contact Lists" />
          </span>
        </div>

        <div className="relative mt-4 h-fit">
          <IoSearchOutline className="absolute left-3 top-2 text-2xl text-lightText" />
          <input
            value={searchUser}
            onChange={(e) => {
              setsearchUser(e.target.value);
            }}
            className={` ${theme == "dark" ? "bg-transparent" : "bg-[#F2F2F2]"
              } text-sm w-full rounded-xl border border-borderColor py-2 pl-11 placeholder-lightText outline-none`}
            type="text"
            placeholder={translate("Search User")}
          />
        </div>
      </div>
      <ContactList searchUser={searchUser} />
    </div>
  );
}
