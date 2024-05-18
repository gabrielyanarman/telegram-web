'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import MiddleColumn from './components/MiddleColumn/MiddleColumn';
import Loader from '@/app/components/Loader';
import SearchGroup from './components/LeftColumn/SearchGroup';
import LeftColumnHeader from './components/LeftColumn/LeftColumnHeader';
import { getUsersAsync, usersSelector } from '@/app/redux/slices/usersSlice';
import { searchStateSelector } from '@/app/redux/slices/searchSlice';
import UsersList from './components/LeftColumn/UsersList';
import ChatsList from './components/LeftColumn/ChatsList';
import { OnChatContext } from '../layout';
import { useTheme } from 'next-themes';

export default function MessengerLayout({ children }) {
  const dispatch = useDispatch();
  const [currentUser, loading] = useAuthState(auth);
  const searchTab = useSelector(searchStateSelector).searchTab;
  const usersLastVisible = useSelector(usersSelector).lastVisible;
  const {onChat} = useContext(OnChatContext)
  const {theme} = useTheme()
  const [backgroundURL, setBackgroundURL] = useState(null)

  useEffect(() => {
    if (loading) return;
    dispatch(getUsersAsync({ usersLastVisible }));
  }, [loading, currentUser, dispatch, usersLastVisible]);

  useEffect(() => {
     const darkModeBackground =
       'https://firebasestorage.googleapis.com/v0/b/my-telegram-app-1.appspot.com/o/background%2FdarkMode-bg.jpg?alt=media&token=d555eae7-1b02-40a6-8dd3-a56984f6be89';
     const lightModeBackground =
       'https://firebasestorage.googleapis.com/v0/b/my-telegram-app-1.appspot.com/o/background%2Fbg-img.jpg?alt=media&token=f703784e-7b12-451f-8da4-900e67a8ddc9';
     setBackgroundURL(theme === 'dark' ? darkModeBackground : lightModeBackground);
  },[theme])

  if (!currentUser || loading) {
    return (
      <div className="w-full min-h-96 flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full h-[100vh] sm:h-[calc(100vh-81px)] flex relative">
      <div
        className={`${onChat ? 'hidden sm:block' : 'block'} ${theme == 'dark' ? 'dark-my-shadow-r' : 'my-shadow-r'} w-full sm:w-[45%] md:w-1/3 lg:w-1/4 h-full flex flex-col relative`}
      >
        <LeftColumnHeader />
        <SearchGroup />
        <div className="chatList transition-all duration-300 overflow-y-scroll py-3 pl-2 pr-1 mr-[1px] flex flex-col gap-1 relative">
          {searchTab == 'users' ? <UsersList /> : <ChatsList />}
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${backgroundURL})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className={`${!onChat ? 'hidden sm:block' : 'block'} w-full sm:w-[55%] md:w-2/3 lg:w-3/4 h-full`}
      >
        <MiddleColumn />
      </div>
    </div>
  );
}
