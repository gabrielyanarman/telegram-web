import Avatar from '@/app/components/Avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector } from '@/app/redux/slices/usersSlice';
import { useEffect, useState } from 'react';
import { findParticipantUser } from '@/app/utils/helpers';
import { chatsSelector } from '@/app/redux/slices/chatsSlice';

function ChatInfo() {
  const [user, setUser] = useState(null);
  const [thisUser] = useAuthState(auth);
  const pathName = usePathname();
  const users = useSelector(usersSelector);
  const chats = useSelector(chatsSelector);

  useEffect(() => {
    const lastPartPath = pathName.split('/:').at(-1);
    const openedChat = chats.data[lastPartPath];
    if (!openedChat) return;
    const user = findParticipantUser(thisUser, openedChat, users);
    setUser(user);
  }, [pathName, users.loading, chats.loading]);

  return (
    <div className="flex gap-4">
      {user ? (
        <>
          <Avatar url={user.photoURL} width={12} height={12} />
          <span className="font-bold">{user.displayName}</span>
        </>
      ) : null}
    </div>
  );
}

export default ChatInfo;
