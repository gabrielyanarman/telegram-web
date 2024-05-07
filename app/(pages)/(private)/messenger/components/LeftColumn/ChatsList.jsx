'use client';

import { useSelector } from 'react-redux';
import ChatItem from './ChatItem';
import { chatsSelector } from '@/app/redux/slices/chatsSlice';
import Loader from '@/app/components/Loader';
import { usersSelector } from '@/app/redux/slices/usersSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/app/firebase';
import { searchStateSelector } from '@/app/redux/slices/searchSlice';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatsList() {
  const users = useSelector(usersSelector);
  const [thisUser] = useAuthState(auth);
  const chatsRef = collection(firestore, 'chats');
  const q = query(
    chatsRef,
    where('participants', 'array-contains', thisUser.uid),
    orderBy('lastMessageTime', 'desc'),
  );
  const [chatsData, chatsLoading, error] = useCollectionData(q);
  const searchValue = useSelector(searchStateSelector).value;

  if (error) {
    console.log(error);
    return;
  }

  return (
    <>
      {chatsLoading ? (
        <div className="w-full flex justify-center pt-10">
          <Loader />
        </div>
      ) : chatsData.length ? (
        chatsData.map((chat) => {
          const uid = chat.participants.find((uid) => uid != thisUser.uid);
          const user = users.data[uid];
          return user.displayName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ? (
            <ChatItem key={chat.chatId} user={user} />
          ) : null;
        })
      ) : (
        <div className="w-full flex justify-center pt-10">
          <span className="text-gray-500 font-semibold">no chats found</span>
        </div>
      )}
    </>
  );
}

export default ChatsList;
