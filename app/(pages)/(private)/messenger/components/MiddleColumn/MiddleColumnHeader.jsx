'use client';
import ChatInfo from './ChatInfo';
import HeaderActions from './HeaderActions';

function MiddleColumnHeader() {
  return (
    <div className="py-2 pr-3 pl-6 my-shadow-b flex justify-between">
      <ChatInfo />
      <HeaderActions />
    </div>
  );
}

export default MiddleColumnHeader;
