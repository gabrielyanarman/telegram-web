'use client';
import { useRouter } from 'next/navigation';
import ChatInfo from './ChatInfo';
import HeaderActions from './HeaderActions';
import { useContext } from 'react';
import { OnChatContext } from '@/app/(pages)/layout';
import { useTheme } from 'next-themes';

function MiddleColumnHeader({ openedChat }) {
  const router = useRouter()
  const {setOnChat} = useContext(OnChatContext)
  const {theme} = useTheme()

  return (
    <div
      className={`${theme == 'dark' ? 'dark-my-shadow-b' : 'my-shadow-b'} py-2 sm:pr-3 pl-2 sm:pl-6 my-shadow-b flex justify-between bg-white dark:bg-[#212121] z-20 items-center`}
    >
      <div
        className="block sm:hidden"
        onClick={() => {
          setOnChat(false);
          router.push('/messenger/chats');
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-7 h-7 text-gray-500 dark:text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </div>
      <ChatInfo />
      <HeaderActions openedChat={openedChat} setOnChat={setOnChat} />
    </div>
  );
}

export default MiddleColumnHeader;
