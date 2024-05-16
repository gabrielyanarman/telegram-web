'use client';
import { getUsersAsync, usersSelector } from '@/app/redux/slices/usersSlice';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatItem from './ChatItem';
import Loader from '@/app/components/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { searchStateSelector } from '@/app/redux/slices/searchSlice';
import { useUsersTotalCount } from '@/app/utils/hooks';
import { OnChatContext } from '@/app/(pages)/layout';

function UsersList() {
  const users = useSelector(usersSelector);
  const {setOnChat} = useContext(OnChatContext)
  const [currentUser] = useAuthState(auth);
  const searchValue = useSelector(searchStateSelector).value;
  const [totalCount, setTotalCount] = useState(null);
  const addLimitDivRef = useRef(null);
  const [position, setPosition] = useState({
    done: true,
    count: 10,
  });
  const [limitUsers, setLimitUsers] = useState(10);
  const observer = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    useUsersTotalCount()
      .then((total) => {
        setTotalCount(total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (searchValue) return;
    if (users.loading) return;
    if (!totalCount) return;
    if (totalCount == Object.keys(users.data).length) return;
    if (observer.current) observer.current.disconnect();
    const callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
        setPosition({
          done: false,
          count: position.count + limitUsers,
        });
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(addLimitDivRef.current);
  }, [users.loading, searchValue, users.data, totalCount]);

  useEffect(() => {
    if (users.loading) return;
    if (position.done) return;
    const lastVisible = Object.keys(users.data).at(-1);
    dispatch(getUsersAsync({ lastVisible, limitUsers }));
    setPosition({
      ...position,
      done: true,
    });
  }, [position.count, users.loading]);

  return (
    <>
      {!Object.keys(users.data).length ? (
        <div className="w-full flex justify-center pt-10">
          <Loader />
        </div>
      ) : Object.keys(users.data).length > 1 ? (
        Object.values(users.data).map((user) => {
          return user.uid === currentUser.uid ||
            !user.displayName
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ? null : (
            <ChatItem key={user.uid} user={user} setOnChat={setOnChat} />
          );
        })
      ) : (
        <div className="w-full flex justify-center pt-10">
          <span className="text-gray-500 font-semibold">no users found</span>
        </div>
      )}
      <div ref={addLimitDivRef} className="h-4 bg-transparent w-full"></div>
    </>
  );
}

export default UsersList;
