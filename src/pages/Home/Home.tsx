import { Outlet } from "react-router-dom";

// components:
import Sidebar from "./Sidebar";
import Bottombar from "./Bottombar";
import MessageList from "./MessageList/MessageList";
import EmptyChatScreen from "./Chat/EmptyChatScreen";

// utils and context:
import { useAppSelector } from "../../utils/hooks";
import { useTheme } from "../../context/ThemeProvider";
import OnClickOutside from "../../utils/OnClickOutSide";

export default function Home() {
  const currentConversationData = useAppSelector(
    (state) => state.CurrentConversation,
  );
  const ViewManager = useAppSelector((state) => state.ViewManager);

  // @ts-ignore
  const { theme } = useTheme();

  return (
    <div>
      <div className="relative flex w-screen">
        <Sidebar />
        <div
          className={`fixed left-0 z-10 w-full min-w-[25rem] transition-all duration-500 lg:relative lg:min-h-max lg:w-fit lg:max-w-fit lg:transition-none ${ViewManager.show_chats_sidebar ? "translate-x-0" : "-translate-x-[100%] lg:translate-x-0"}`}
        >
          <Outlet />
        </div>
        <div
          className="grid h-[100dvh] w-full pb-16 lg:pb-0"
          style={{
            backgroundImage: `url(${"/Home/chat_background_image.png"})`,
          }}
        >
          <div
            className={`${theme == "dark" ? "bg-[#1D1D1D]" : "bg-[#FAFAFA]"
              } relative h-full bg-opacity-[0.98]`}
          >
            <OnClickOutside
              className="h-full"
              onClickOutside={() => {
              }}
            >
              {currentConversationData.conversation_id == -1 ? (
                <EmptyChatScreen />
              ) : (
                <MessageList />
              )}
            </OnClickOutside>
          </div>
        </div>
      </div>
      <Bottombar />
    </div>
  );
}
