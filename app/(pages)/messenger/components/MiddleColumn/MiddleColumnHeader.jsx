'use client';
import ChatInfo from './ChatInfo';
import HeaderActions from './HeaderActions';

function MiddleColumnHeader({ openedChat }) {
  return (
    <div className="py-2 pr-3 pl-6 my-shadow-b flex justify-between bg-white z-20">
      <ChatInfo />
      <HeaderActions openedChat={openedChat} />
    </div>
  );
}

export default MiddleColumnHeader;
