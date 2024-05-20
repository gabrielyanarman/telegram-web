import { auth } from '@/app/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getTime } from '@/app/utils/helpers';
import { useEffect, useState } from 'react';

function Message({ message }) {
  const [currentUser, loading] = useAuthState(auth);

  if (loading) return;
  return (
    <div
      className={`${currentUser.uid == message.uid ? 'bg-[#E3FEE0] dark:bg-indigo-500 self-end' : 'bg-white dark:bg-[#212121]'} fade-in inline-block rounded-2xl min-w-28 max-w-[70%]`}
    >
      <div className="text-slate-900 dark:text-white pt-[6px] pb-[2px] px-2">
        {message.text}
      </div>
      <div
        className={`${currentUser.uid == message.uid ? 'text-gray-500 dark:text-gray-100' : 'text-[#75B86D] dark:text-[#979696]'} pr-[10px] flex justify-end time text-xs self-end ml-auto`}
      >
        {getTime(message.createdAt)}
      </div>
    </div>
  );
}

export default Message;
