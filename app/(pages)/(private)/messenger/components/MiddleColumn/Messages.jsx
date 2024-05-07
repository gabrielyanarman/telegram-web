import { useCallback, useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Message from './Message';
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, firestore } from '@/app/firebase';
import { usePathname } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '@/app/components/Loader';

function Messages() {
  const [valueArea, setValueArea] = useState('');
  const [thisUser, loadingThisUser] = useAuthState(auth);
  const pathName = usePathname();
  const chatId = pathName.split('/:').at(-1);
  const collectionRef = collection(firestore, 'messages');
  const q = query(
    collectionRef,
    where('chatId', '==', chatId),
    orderBy('createdAt'),
  );
  const [messages, messagesLoading, error] = useCollectionData(q);

  const sendMessage = useCallback(async () => {
    if (!valueArea.length) return;
    const timer = Date.now();
    await addDoc(collectionRef, {
      text: valueArea,
      chatId: chatId,
      uid: thisUser.uid,
      createdAt: timer,
    });
    const chatRef = doc(firestore, `chats/${chatId}`);
    await updateDoc(chatRef, {
      lastMessage: valueArea,
      lastMessageTime: timer,
    });
  }, [thisUser, pathName, valueArea, collectionRef]);

  useEffect(() => {
    if (messagesLoading) return;
    const messengerContainer = document.getElementById('messenger-container');
    messengerContainer.scrollTo({
      top: messengerContainer.scrollHeight,
    });
  }, [messages, pathName]);

  if (error) {
    console.log(error);
    return;
  }
  return (
    <div className="w-full pt-3">
      <div className="relative w-full mx-auto flex flex-col items-center gap-2 justify-end h-[calc(100vh-172px)]">
        <div
          id="messenger-container"
          className={`messages-container w-full overflow-y-scroll relative flex justify-center mr-1 pl-1`}
        >
          <div className="w-4/6 flex flex-col gap-2 items-start">
            {messagesLoading ? (
              <Loader />
            ) : messages.length ? (
              messages.map((message) => (
                <Message key={message.id} message={message} />
              ))
            ) : (
              <span className="text-gray-600 text-lg font-semibold fixed top-1/2 left-1/2 translate-y-1/2 translate-x-1/2 z-20">
                no messages ...
              </span>
            )}
          </div>
          <div className="scroll-bar"></div>
        </div>
        <div className="py-2 w-4/6">
          <form
            className="flex items-end justify-between gap-4 w-full"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
              setValueArea('');
            }}
          >
            <textarea
              type="text"
              placeholder="Message"
              className={`min-h-12 w-[90%] overflow-hidden rounded-xl focus:outline-none py-4 px-3 resize-none`}
              value={valueArea}
              onChange={(event) => {
                setValueArea(event.target.value);
                event.target.style.height = 'auto';
                event.target.style.height = event.target.scrollHeight + 'px';
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                  setValueArea('');
                }
              }}
            />
            <button className="rounded-full w-14 h-14 flex justify-center items-center bg-[#27B170] hover:bg-[rgb(39,177,69)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-white font-semibold"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Messages;
