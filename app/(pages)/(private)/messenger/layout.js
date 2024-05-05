'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MiddleColumn from './components/MiddleColumn/MiddleColumn';
import Loader from '@/app/components/Loader';
import SearchGroup from './components/LeftColumn/SearchGroup';
import LeftColumnHeader from './components/LeftColumn/LeftColumnHeader';
import { getUsersAsync } from '@/app/redux/slices/usersSlice';
import { getChatsForUserAsync } from '@/app/redux/slices/chatsSlice';
import { searchStateSelector } from '@/app/redux/slices/searchSlice';
import UsersList from './components/LeftColumn/UsersList';
import ChatsList from './components/LeftColumn/ChatsList';

export default function MessengerLayout({ children }) {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);
  const searchTab = useSelector(searchStateSelector).searchTab;

  useEffect(() => {
    dispatch(getUsersAsync());
    !loading && dispatch(getChatsForUserAsync(user.uid));
  }, [loading]);

  if (user === null || loading) {
    return (
      <div className="w-full min-h-96 flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full h-[calc(100vh-81px)] flex relative">
      <div className="my-shadow-r w-1/4 h-full flex flex-col relative">
        <LeftColumnHeader />
        <SearchGroup />
        <div className="overflow-y-auto">
          <div className="py-3 px-2 flex flex-col gap-1">
            {searchTab == 'users' ? <UsersList /> : <ChatsList />}
          </div>
        </div>
      </div>
      <MiddleColumn />
    </div>
  );
}
