import { useState } from "react";
import { ClipLoader } from "react-spinners";

// hooks and components
import useApiPost from "../../../hooks/PostData";
import TextTranslate from "../../../utils/TextTranslate";
import { useTheme } from "../../../context/ThemeProvider";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { useBlockUserList } from "../../../store/api/useBlockUserList";
import { updateForwardedList } from "../../../store/Slices/ForwardMessageSlice";
import LoadingSkeletonImageDynamic from "../../../components/LoadingSkeletonImageDynamic";

export default function BlockUserList() {
  const [selectedConversationId, setSelectedConversationId] = useState(0);
  // @ts-ignore
  const { theme } = useTheme();
  const { data, isLoading, refetch } = useBlockUserList();
  let OnlineUserList = useAppSelector((state) => state.OnlineUserList);
  const dispatch = useAppDispatch();
  const { loading, postData } = useApiPost();

  async function unblockUser({ conversation_id }: { conversation_id: number }) {
    await postData("block-user", {
      conversation_id,
    });

    refetch();
  }

  return (
    <div className="my-5 flex h-[60vh] w-full max-w-full flex-col overflow-y-auto overflow-x-hidden">
      {isLoading ? (
        <div className="grid h-full place-content-center">
          <ClipLoader size={23} color={theme == "dark" ? "white" : "black"} />
        </div>
      ) : data?.blockUserList?.length == 0 ? (
        <div className="grid h-96 place-content-center gap-5">
          <img
            className="mx-auto h-16 w-16"
            src="/LightIcons/no_search_result_found.png"
            alt=""
          />
          <div>
            <TextTranslate text="No blocked account" />
          </div>
        </div>
      ) : (
        data?.blockUserList?.map((e) => {
          return (
            <>
              <div
                className={`hover:bg-selectedChatdata flex cursor-pointer items-center justify-start px-3 py-4`}
              >
                <div className="relative mr-3 h-14 w-14 2xl:h-12 2xl:w-12">
                  <LoadingSkeletonImageDynamic
                    radius=""
                    className="h-10 w-10 rounded-full object-cover 2xl:h-12 2xl:w-12"
                    image_height="100%"
                    image_url={
                      e?.Conversation?.BlockedUserDetails[0]?.profile_image
                    }
                    image_width=""
                  />
                  {OnlineUserList.onlineUserList.includes(
                    e.user_id.toString(),
                  ) && (
                      <img
                        className="absolute bottom-0 right-0 z-30 h-4 w-4"
                        src="/Home/Online_Green_dot.png"
                        alt=""
                      />
                    )}
                </div>

                <div>
                  <div className="text-base font-medium capitalize text-darkText">
                    {e?.Conversation?.BlockedUserDetails[0]?.user_name}
                  </div>
                </div>

                <button
                  onClick={() => {
                    dispatch(
                      updateForwardedList({
                        conversation_id: e?.conversation_id,
                      }),
                    );
                    unblockUser({ conversation_id: e?.conversation_id });
                    setSelectedConversationId(e?.conversation_id);
                  }}
                  className={`relative ml-auto mr-3 h-9 w-28 overflow-hidden rounded-full border border-rose-500 px-4 text-sm font-medium outline-none`}
                >
                  {(loading || isLoading) &&
                    selectedConversationId == e?.conversation_id ? (
                    <ClipLoader
                      size={21}
                      color={theme == "dark" ? "white" : "black"}
                    />
                  ) : (
                    "Unblock"
                  )}
                </button>
              </div>
              <hr className="border-t border-borderColor" />
            </>
          );
        })
      )}
    </div>
  );
}
