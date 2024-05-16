'use client';
import ChatInfo from './ChatInfo';
import HeaderActions from './HeaderActions';

function MiddleColumnHeader({ openedChat, setOnChat }) {
  return (
    <div className="py-2 sm:pr-3 pl-2 sm:pl-6 my-shadow-b flex justify-between bg-white z-20 items-center">
      <div
        className="block sm:hidden"
        onClick={() => {
          setOnChat(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-7 h-7 text-gray-500"
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
