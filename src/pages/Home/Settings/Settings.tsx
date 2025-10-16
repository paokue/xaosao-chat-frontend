import { GoDotFill } from "react-icons/go";
import { RWebShare } from "react-web-share";
import { useNavigate } from "react-router-dom";

// icons:
import {
  MdOutlineStarBorderPurple500,
} from "react-icons/md";
import { RxShare2 } from "react-icons/rx";
import { HiLanguage } from "react-icons/hi2";
import { BsInfoCircle } from "react-icons/bs";
import { RiUserUnfollowLine } from "react-icons/ri";
import { FaChevronLeft, FaPlus } from "react-icons/fa6";

// conponents:
import BlockUserListModal from "./BlockUserListModal";
import ReusableProfileCard from "../Profile/ReusableProfileCard";

// utils:
import TextTranslate from "../../../utils/TextTranslate";
import { useTranslateText } from "../../../hooks/useTranslateText";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { updateViewState } from "../../../store/Slices/ViewManagerSlice";
import { updateMessageOptions } from "../../../store/Slices/MessageOptionsSlice";
import { useTheme } from "../../../context/ThemeProvider";

export default function Setting() {
  const theme = useTheme()
  const navigate = useNavigate();
  const translate = useTranslateText();
  const userData = useAppSelector((state) => state.userData);

  let dispatch = useAppDispatch();
  const handleValueChange = (newValue: string) => {
    console.log(newValue);
  };

  let LanguageTextList = useAppSelector((state) => state.LanguageTextList);

  function translateTextFunc(text: string) {
    if (!LanguageTextList || !LanguageTextList.results) {
      return <>{text}</>;
    }

    const results = LanguageTextList.results;
    const translation = results.find((element: any) => element.key === text);
    if (translation) {
      return translation.Translation;
    } else {
      return text;
    }
  }

  return (
    <>
      <BlockUserListModal />
      <div className="flex h-screen w-full min-w-80 max-w-md flex-col overflow-auto bg-secondary shadow-inner 2xl:min-w-96">
        <div
          style={{
            backgroundSize: "100%",
          }}
          className={`h-full w-full space-y-3 px-4 py-2 xl:space-y-5 ${theme.theme === "dark" ? "bg-[#2A2A2A]" : "bg-[#F1F1F1]"}`}
        >
          <div className="flex items-center gap-3 pt-6 font-semibold text-black lg:pt-16 2xl:pt-16">
            <FaChevronLeft
              className={`cursor-pointer ${theme.theme === "dark" ? "text-white" : "text-black"}`}
              onClick={() => {
                navigate(-1);
              }}
            />
            <span className={`${theme.theme === "dark" ? "text-white" : "text-black"}`}>
              <TextTranslate text="Settings" />
            </span>
          </div>

          <div className="relative mx-auto h-fit w-fit pt-16 lg:pt-3">
            <img
              src={userData.profile_image}
              className={`mx-auto h-32 w-32 rounded-full bg-secondary object-cover p-2`}
              alt=""
            />
            <div
              onClick={() => {
                dispatch(updateViewState({ showChangeProfileModal: true }));
              }}
              className="absolute bottom-1 right-2 z-10 grid h-8 w-8 cursor-pointer place-content-center rounded-full bg-primary"
            >
              <FaPlus className="primary-gradient rounded-full p-1 text-xl" />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <span className="text-lg font-semibold">
              {userData.first_name} {userData.last_name}
            </span>
            <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-xl bg-primary px-2 py-1 shadow-2xl text-sm">
              <GoDotFill className="text-[#2AAC7A]" />
              Online
            </div>
          </div>
        </div>


        <div className="mt-10 flex flex-col gap-4 px-4">
          <div
            onClick={() => {
              dispatch(updateMessageOptions({ show_all_star_messages: true }));
              navigate("/profile");
            }}
          >
            <ReusableProfileCard
              icon={<MdOutlineStarBorderPurple500 className="text-xl" />}
              value={translate("Profile")}
              onChange={handleValueChange}
              isDisabled={true}
            />
          </div>

          <ReusableProfileCard
            onClick={() => {
              dispatch(
                updateMessageOptions({
                  show_select_about_modal: true,
                }),
              );
            }}
            icon={<BsInfoCircle className="text-lg" />}
            value={userData.bio}
            onChange={handleValueChange}
            isDisabled={true}
          />

          {/* Starred Messages ====================================================================================*/}
          <div
            onClick={() => {
              dispatch(updateMessageOptions({ show_all_star_messages: true }));
              navigate("/star-messages");
            }}
          >
            <ReusableProfileCard
              icon={<MdOutlineStarBorderPurple500 className="text-xl" />}
              value={translate("Starred Messages")}
              onChange={handleValueChange}
              isDisabled={true}
            />
          </div>

          {/* Block Contacts ====================================================================================*/}
          <div
            onClick={() => {
              dispatch(updateViewState({ showBlockUserList: true }));
            }}
          >
            <ReusableProfileCard
              icon={<RiUserUnfollowLine className="text-xl" />}
              value={translate("Block Contacts")}
              onChange={handleValueChange}
              isDisabled={true}
            />
          </div>

          {/* Share a link ====================================================================================*/}
          <RWebShare
            data={{
              text: "Xaosao Chat",
              url: `${window.location.origin}`,
              title: "Xaosao Chat",
            }}
          >
            <ReusableProfileCard
              icon={<RxShare2 className="text-lg" />}
              value={translate("Share a link")}
              onChange={handleValueChange}
              isDisabled={true}
            />
          </RWebShare>

          {/* Language ====================================================================================*/}
          <div
            onClick={() => {
              dispatch(
                updateViewState({
                  show_select_language_modal: true,
                }),
              );
            }}
          >
            <ReusableProfileCard
              icon={<HiLanguage className="text-xl" />}
              value={translate("Language")}
              onChange={handleValueChange}
              isDisabled={true}
            />
          </div>
        </div>

        <div className="text-sm my-4 pt-16 text-center font-semibold lg:pb-0"></div>
      </div>
    </>
  );
}
