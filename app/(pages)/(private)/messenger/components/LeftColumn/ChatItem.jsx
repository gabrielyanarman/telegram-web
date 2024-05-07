import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import { collection, doc, query, setDoc, where } from 'firebase/firestore';
import { auth, firestore } from '@/app/firebase';
import Avatar from '@/app/components/Avatar';
import { findParticipantUser, getTime } from '@/app/utils/helpers';
import { usersSelector } from '@/app/redux/slices/usersSlice';
import {
  changeSearchTab,
  searchStateSelector,
} from '@/app/redux/slices/searchSlice';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatItem({ user }) {
  const [chatWithUser, setChatWithUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});
  const [lastMessage, setLastMessage] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const [thisUser, thisUserLoading] = useAuthState(auth);

  const pathName = usePathname();
  const users = useSelector(usersSelector);
  const chatsRef = collection(firestore, 'chats');
  const q = query(
    chatsRef,
    where('participants', 'array-contains', thisUser.uid),
  );
  const [chats, chatsLoading, error] = useCollectionData(q);
  const searchTab = useSelector(searchStateSelector).searchTab;

  useEffect(() => {
    if (users.loading || chatsLoading || thisUserLoading || error) return;
    const chatId = `${thisUser.uid}-${user.uid}`.split('').sort().join('');
    const chat = chats.find((chat) => chat.chatId == chatId);
    chat ? setChatWithUser(chat) : setChatWithUser(null);
  }, [user, thisUser, chats]);

  useEffect(() => {
    if (users.loading || chatsLoading || thisUserLoading || error) return;
    if (!chatWithUser || !chatWithUser.lastMessage) return;
    setLastMessage({
      text: chatWithUser.lastMessage,
      time: getTime(chatWithUser.lastMessageTime),
    });
  }, [chatWithUser]);

  useEffect(() => {
    if (chatsLoading || thisUserLoading) return;
    const lastPartPath = pathName.split('/:').at(-1);
    const openedChat = chats.find((chat) => chat.chatId == lastPartPath);
    if (!openedChat) return;
    const user = findParticipantUser(thisUser, openedChat, users);
    setSelectedUser(user);
  }, [pathName, users.loading, chatsLoading, thisUserLoading]);

  const addChatOnCollection = useCallback(
    async (user1Id, user2Id) => {
      const chatId = `${user1Id}-${user2Id}`.split('').sort().join('');
      await setDoc(doc(firestore, `chats/${chatId}`), {
        chatId: chatId,
        participants: [user1Id, user2Id],
        lastMessage: null,
        lastMessageTime: null,
      });
    },
    [firestore],
  );

  return (
    <div
      className={`${
        selectedUser.uid == user.uid && searchTab == 'chats'
          ? 'bg-[#3390EC] hover:bg-[#3390EC]'
          : 'hover:bg-gray-100'
      } px-2 py-3 rounded-2xl transition-all duration-300 cursor-pointer w-[90%]`}
      onClick={(e) => {
        e.preventDefault();
        if (chatWithUser) {
          router.push(`/messenger/chats/:${chatWithUser.chatId}`);
          dispatch(changeSearchTab('chats'));
        } else {
          addChatOnCollection(thisUser.uid, user.uid);
          const chatId = `${thisUser.uid}-${user.uid}`
            .split('')
            .sort()
            .join('');
          router.push(`/messenger/chats/:${chatId}`);
          setSelectedUser(user);
          dispatch(changeSearchTab('chats'));
        }
      }}
    >
      <div className="flex w-full gap-4">
        <div>
          <Avatar url={user.photoURL} width={12} height={12} />
        </div>
        <div className="flex flex-col gap-2 justify-center items-start w-full relative truncate">
          <div className="flex justify-between w-full items-center">
            <span
              className={`${
                selectedUser.uid == user.uid &&
                searchTab == 'chats' &&
                'text-white'
              } font-semibold transition-all duration-300`}
            >
              {user.displayName}
            </span>
            {searchTab == 'chats' && (
              <span
                className={`${selectedUser.uid == user.uid ? 'text-slate-100' : 'text-gray-500'} text-xs font-semibold`}
              >
                {lastMessage.time || ''}
              </span>
            )}
          </div>
          {searchTab == 'chats' && (
            <div
              className={`${selectedUser.uid == user.uid ? 'text-slate-100' : 'text-gray-500'} text-sm font-semibold pr-8 whitespace-nowrap`}
            >
              {lastMessage.text || ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
