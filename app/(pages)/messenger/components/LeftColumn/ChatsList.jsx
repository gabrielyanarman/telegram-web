'use client';

import { useSelector } from 'react-redux';
import ChatItem from './ChatItem';
import Loader from '@/app/components/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/app/firebase';
import { searchStateSelector } from '@/app/redux/slices/searchSlice';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import { useGetUser } from '@/app/utils/hooks';

function ChatsList() {

  const [loading, setLoading] = useState(true);
  const [currentUser] = useAuthState(auth);

  const [chatItems, setChatItems] = useState([]);
  const chatsRef = collection(firestore, 'chats');
  const q = query(
    chatsRef,
    where('participants', 'array-contains', currentUser.uid),
    orderBy('lastMessageTime', 'desc'),
  );
  const [chatsData, chatsLoading, error] = useCollectionData(q);
  const searchValue = useSelector(searchStateSelector).value;

  useEffect(() => {
    if (chatsData) {
      const promises = chatsData.map(async (chat) => {
        const uid = chat.participants.find((uid) => uid !== currentUser.uid);
        const user = await useGetUser(uid);
        return { chat, user };
      });

      Promise.all(promises)
        .then((results) => {
          const filteredChatItems = results
            .filter(({ user }) =>
              user.displayName
                .toLowerCase()
                .includes(searchValue.toLowerCase()),
            )
            .map(({ chat, user }) => (
              <ChatItem key={chat.chatId} user={user} />
            ));
          setChatItems(filteredChatItems);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  }, [chatsData, currentUser.uid, searchValue]);

  if (error) {
    console.log(error);
    return;
  }

  return (
    <>
      {chatsLoading || loading ? (
        <div className="w-full flex justify-center pt-10">
          <Loader />
        </div>
      ) : chatItems.length ? (
        chatItems
      ) : (
        <div className="w-full flex justify-center pt-10">
          <span className="text-gray-500 font-semibold">No chats found</span>
        </div>
      )}
    </>
  );
}

export default ChatsList;
