import MiddleColumnHeader from './MiddleColumnHeader';
import Messages from './Messages';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { chatsSelector } from '@/app/redux/slices/chatsSlice';
import { useEffect, useState } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { auth, firestore } from '@/app/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function MiddleColumn() {
  const [openedChat, setOpenedChat] = useState(null);
  const pathName = usePathname();
  const [thisUser, thisUserLoading] = useAuthState(auth);
  const chatsRef = collection(firestore, 'chats');
  const q = query(
    chatsRef,
    where('participants', 'array-contains', thisUser.uid),
  );
  const [chats, chatsLoading, error] = useCollectionData(q);

  useEffect(() => {
    if (thisUserLoading || chatsLoading) return;
    const chatId = pathName.split('/:').at(-1);
    const chat = chats.filter((chat) => chat.chatId == chatId)[0];
    chat ? setOpenedChat(chat) : setOpenedChat(null);
  }, [pathName, chats]);

  return (
    <div className="w-3/4 h-full bg-messages">
      {openedChat && (
        <>
          <MiddleColumnHeader openedChat={openedChat} />
          <Messages />
        </>
      )}
    </div>
  );
}

export default MiddleColumn;
