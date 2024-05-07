'use client';
import { usersSelector } from '@/app/redux/slices/usersSlice';
import { useSelector } from 'react-redux';
import ChatItem from './ChatItem';
import Loader from '@/app/components/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { searchStateSelector } from '@/app/redux/slices/searchSlice';

function UsersList() {
  const users = useSelector(usersSelector);
  const [thisUser, thisUserLoading] = useAuthState(auth);
  const searchValue = useSelector(searchStateSelector).value;

  return (
    <>
      {users.loading || thisUserLoading ? (
        <div className="w-full flex justify-center pt-10">
          <Loader />
        </div>
      ) : Object.keys(users.data).length > 1 ? (
        Object.values(users.data).map((user) => {
          return user.uid === thisUser.uid ||
            !user.displayName
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ? null : (
            <ChatItem key={user.uid} user={user} />
          );
        })
      ) : (
        <div className="w-full flex justify-center pt-10">
          <span className="text-gray-500 font-semibold">no users found</span>
        </div>
      )}
    </>
  );
}

export default UsersList;
