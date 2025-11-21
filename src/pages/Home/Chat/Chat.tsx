import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FolderDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";

// components
import ConversationList from "./ConversationList";
import ArchiveConversationList from "./ArchiveConversationList";

// utils, hooks and context
import TextTranslate from "../../../utils/TextTranslate";
import { useTheme } from "../../../context/ThemeProvider";
import { useTranslateText } from "../../../hooks/useTranslateText";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";

// store or redux
import { ResData } from "../../../types/UserDataType";
import { updateUserData } from "../../../store/Slices/UserSlice";
import { updateViewState } from "../../../store/Slices/ViewManagerSlice";

export default function Chat() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const translate = useTranslateText();
  const [searchUser, setsearchUser] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const fullname = queryParams.get("id");

  useEffect(() => {
    if (fullname) {
      setsearchUser(fullname)
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("whoxa_auth_token");
    if (!token) {
      navigate("/login-without-otp");
      return;
    }
    try {
      const decoded = jwtDecode<ResData & { iat?: number }>(token);
      const { iat, ...userDataWithoutIat } = decoded;
      dispatch(updateUserData(userDataWithoutIat as ResData));

    } catch (error) {
      navigate("/login-without-otp");
    }
  }, [dispatch]);

  const ViewManager = useAppSelector((state) => state.ViewManager);
  const archiveList = useAppSelector((state) => state.archiveList);

  return (
    <>
      <div className="relative flex h-screen w-full min-w-[21rem] flex-col bg-secondary pb-14 pt-6 shadow-inner lg:max-w-md lg:pb-0 lg:pt-16 2xl:min-w-[22rem]">
        <div className="w-full px-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">
              <TextTranslate text="My Chats" />
            </h4>
          </div>
          <div className="relative mt-4 h-fit">
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
          <div
            onClick={() => {
              ViewManager.showArchiveList
                ? dispatch(updateViewState({ showArchiveList: false }))
                : dispatch(updateViewState({ showArchiveList: true }));
            }}
            className="my-4 ml-4 flex cursor-pointer items-center gap-3"
          >
            {ViewManager.showArchiveList ? (
              <MdArrowBackIos />
            ) : (
              <FolderDown size={20} className="text-rose-500" />
            )}
            <div className="flex w-full justify-between">
              <TextTranslate
                text={ViewManager.showArchiveList ? "Back to chat" : "Archived"}
              />
              {archiveList.length > 0 && (
                <div className="bg-rose-500 z-10 grid h-5 w-5 place-content-center rounded-full text-xs text-white">
                  {archiveList?.length}
                </div>
              )}
            </div>
          </div>
        </div>

        {ViewManager.showArchiveList ? (
          <ArchiveConversationList searchUser={searchUser} />
        ) : (
          <ConversationList searchUser={searchUser} />
        )}
      </div>
    </>
  );
}
