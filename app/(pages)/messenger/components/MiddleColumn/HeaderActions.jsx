import { firestore } from '@/app/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

function HeaderActions({ openedChat, setOnChat }) {
  const router = useRouter();

  const deleteChat = useCallback(
    async (chatId) => {
      await deleteDoc(doc(firestore, `chats/${chatId}`));
      const messagesRef = collection(firestore, 'messages');
      const q = query(messagesRef, where('chatId', '==', openedChat.chatId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        console.log(document.data());
        await deleteDoc(document.ref);
      });
    },
    [openedChat],
  );

  return (
    <div className="flex gap-4 items-center">
      <button
        className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-[#414040]"
        onClick={() => {
          const sure = confirm('Do you want delete this chat ?');
          if (!sure) return;
          deleteChat(openedChat.chatId);
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
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}

export default HeaderActions;
