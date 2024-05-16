'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import MiddleColumn from './components/MiddleColumn/MiddleColumn';
import Loader from '@/app/components/Loader';
import SearchGroup from './components/LeftColumn/SearchGroup';
import LeftColumnHeader from './components/LeftColumn/LeftColumnHeader';
import { getUsersAsync, usersSelector } from '@/app/redux/slices/usersSlice';
import { searchStateSelector } from '@/app/redux/slices/searchSlice';
import UsersList from './components/LeftColumn/UsersList';
import ChatsList from './components/LeftColumn/ChatsList';

export default function MessengerLayout({ children }) {
  const dispatch = useDispatch();
  const [currentUser, loading] = useAuthState(auth);
  const searchTab = useSelector(searchStateSelector).searchTab;
  const [onChat, setOnChat] = useState(false)
  const usersLastVisible = useSelector(usersSelector).lastVisible;

  useEffect(() => {
    if (loading) return;
    dispatch(getUsersAsync({ usersLastVisible }));
  }, [loading]);

  if (!currentUser || loading) {
    return (
      <div className="w-full min-h-96 flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full h-[calc(100vh-81px)] flex relative">
      <div
        className={`${onChat ? 'hidden sm:block' : 'block'} my-shadow-r w-full sm:w-[45%] md:w-1/3 lg:w-1/4 h-full flex flex-col relative`}
      >
        <LeftColumnHeader />
        <SearchGroup />
        <div className="chatList transition-all duration-300 overflow-y-scroll py-3 pl-2 pr-1 mr-[1px] flex flex-col gap-1 relative">
          {searchTab == 'users' ? (
            <div>
              <UsersList setOnChat={setOnChat} />
            </div>
          ) : (
            <ChatsList setOnChat={setOnChat} />
          )}
        </div>
      </div>
      <div
        className={`${!onChat ? 'hidden sm:block' : 'block'} w-full sm:w-[55%] md:w-2/3 lg:w-3/4 h-full bg-messages`}
      >
        <MiddleColumn setOnChat={setOnChat} />
      </div>
    </div>
  );
}
