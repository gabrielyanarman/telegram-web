import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback, useContext, useEffect, useState } from 'react';
import { collection, doc, query, setDoc, where } from 'firebase/firestore';
import { auth, firestore } from '@/app/firebase';
import Avatar from '@/app/components/Avatar';
import { findParticipantUser, getChatId, getTime } from '@/app/utils/helpers';
import { usersSelector } from '@/app/redux/slices/usersSlice';
import {
  changeSearchTab,
  changeSearchValue,
  searchStateSelector,
} from '@/app/redux/slices/searchSlice';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { OnChatContext } from '@/app/(pages)/layout';

function ChatItem({ user }) {
  const [chatWithUser, setChatWithUser] = useState(null);
  const {setOnChat} = useContext(OnChatContext)
  const [selectedUser, setSelectedUser] = useState({});
  const [lastMessage, setLastMessage] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentUser, currentUserLoading] = useAuthState(auth);

  const pathName = usePathname();
  const users = useSelector(usersSelector);
  const chatsRef = collection(firestore, 'chats');
  const q = query(
    chatsRef,
    where('participants', 'array-contains', currentUser.uid),
  );
  const [chats, chatsLoading, error] = useCollectionData(q);
  const searchTab = useSelector(searchStateSelector).searchTab;

  useEffect(() => {
    if (users.loading || chatsLoading || currentUserLoading || error) return;
    const chatId = `${currentUser.uid}-${user.uid}`.split('').sort().join('');
    const chat = chats.find((chat) => chat.chatId == chatId);
    chat ? setChatWithUser(chat) : setChatWithUser(null);
  }, [user, currentUser, chats]);

  useEffect(() => {
    if (users.loading || chatsLoading || currentUserLoading || error) return;
    if (!chatWithUser || !chatWithUser.lastMessage) return;
    setLastMessage({
      text: chatWithUser.lastMessage,
      time: getTime(chatWithUser.lastMessageTime),
    });
  }, [chatWithUser]);

  useEffect(() => {
    if (chatsLoading || currentUserLoading) return;
    const chatId = getChatId(pathName);
    const openedChat = chats.find((chat) => chat.chatId == chatId);
    if (!openedChat) return;
    findParticipantUser(currentUser, openedChat, users)
      .then((user) => {
        setSelectedUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pathName, users.loading, chatsLoading, currentUserLoading]);

  const addChatOnCollection = useCallback(
    async (user1Id, user2Id) => {
      const chatId = `${user1Id}-${user2Id}`.split('').sort().join('');
      await setDoc(doc(firestore, `chats/${chatId}`), {
        chatId: chatId,
        participants: [user1Id, user2Id],
        lastMessage: null,
        lastMessageTime: null,
        newMessages: {
          count: 0,
          sender: null,
        },
      });
    },
    [firestore],
  );

  return (
    <div
      className={`${
        selectedUser.uid == user.uid && searchTab == 'chats'
          ? 'sm:bg-[#3390EC] sm:hover:bg-[#3390EC]'
          : 'hover:bg-gray-100'
      } px-2 py-3 rounded-2xl transition-all duration-300 cursor-pointer w-[100%] relative`}
      onClick={(e) => {
        e.preventDefault();
        if (chatWithUser) {
          router.push(`/messenger/chats/:${chatWithUser.chatId}`);
          setOnChat(true)
          dispatch(changeSearchTab('chats'));
          dispatch(changeSearchValue(''));
        } else {
          addChatOnCollection(currentUser.uid, user.uid);
          const chatId = `${currentUser.uid}-${user.uid}`
            .split('')
            .sort()
            .join('');
          router.push(`/messenger/chats/:${chatId}`);
          setSelectedUser(user);
          setOnChat(true);
          dispatch(changeSearchTab('chats'));
          dispatch(changeSearchValue(''));
        }
      }}
    >
      <div className="flex gap-3 justify-between pr-3 max-w-full">
        <div className="w-1/6">
          <Avatar url={user.photoURL} width={12} height={12} />
        </div>
        <div className="flex flex-col gap-2 justify-center items-start w-5/6">
          <div className="flex justify-between w-full items-center">
            <span
              className={`${
                selectedUser.uid == user.uid &&
                searchTab == 'chats' &&
                'sm:text-white'
              } font-bold transition-all duration-300`}
            >
              {user.displayName}
            </span>
            {searchTab == 'chats' && (
              <span
                className={`${selectedUser.uid == user.uid ? 'sm:text-slate-100' : 'text-gray-500'} text-xs font-semibold`}
              >
                {lastMessage.time || ''}
              </span>
            )}
          </div>
          {searchTab == 'chats' && (
            <div className="w-full flex justify-between gap-2">
              <p
                className={`${selectedUser.uid == user.uid ? 'sm:text-slate-100' : 'text-gray-500'} text-sm max-w-full font-semibold inline-block whitespace-nowrap truncate`}
              >
                {lastMessage.text || ''}
              </p>
              {chatWithUser &&
                chatWithUser.newMessages.sender != currentUser.uid &&
                user.uid != selectedUser.uid &&
                chatWithUser.newMessages.count > 0 && (
                  <div className="rounded-full min-w-6 min-h-6 bg-[#27b127] flex justify-center items-center">
                    <span className="text-[15px] font-semibold text-white">
                      {chatWithUser.newMessages.count}
                    </span>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
