import { auth } from '@/app/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getTime } from '@/app/utils/helpers';

function Message({ message }) {
  const [currentUser, loading] = useAuthState(auth);
  if (loading) return;
  return (
    <div
      className={`${currentUser.uid == message.uid ? 'bg-[#E3FEE0] self-end' : 'bg-white'} inline-block rounded-2xl min-w-28 max-w-[70%]`}
    >
      <div className="message text-slate-900 pt-[6px] pb-[2px] px-2">
        {message.text}
      </div>
      <div
        className={`${currentUser.uid == message.uid ? 'text-gray-500' : 'text-[#75B86D]'} pr-[10px] flex justify-end time text-xs self-end ml-auto`}
      >
        {getTime(message.createdAt)}
      </div>
    </div>
  );
}

export default Message;
