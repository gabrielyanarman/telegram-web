import Avatar from '@/app/components/Avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/app/firebase';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { usersSelector } from '@/app/redux/slices/usersSlice';
import { useEffect, useState } from 'react';
import { findParticipantUser, getChatId } from '@/app/utils/helpers';
import { collection, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatInfo() {
  const [user, setUser] = useState(null);
  const [currentUser] = useAuthState(auth);
  const pathName = usePathname();
  const users = useSelector(usersSelector);
  const chatsRef = collection(firestore, 'chats');
  const q = query(
    chatsRef,
    where('participants', 'array-contains', currentUser.uid),
  );
  const [chats, loading, error] = useCollectionData(q);

  useEffect(() => {
    if (loading || error) return;
    const chatId = getChatId(pathName);
    const openedChat = chats.find((chat) => chat.chatId == chatId);
    if (!openedChat) return;
    findParticipantUser(currentUser, openedChat, users)
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pathName, chats, users.loading, loading]);

  if (error) {
    console.log(error.message);
    return;
  }
  return (
    <div className="flex gap-4 items-center sm:items-start">
      {user ? (
        <>
          <Avatar url={user.photoURL} width={12} height={12} />
          <span className="font-bold dark:text-white">{user.displayName}</span>
        </>
      ) : null}
    </div>
  );
}

export default ChatInfo;
