'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { auth } from '@/app/firebase';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import Cookies from 'js-cookie';

export default function LogIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentUser, currentUserLoading] = useAuthState(auth);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (currentUserLoading) return;
    if (currentUser) router.push('/messenger/chats');
  }, [currentUser]);

  const [loginData, setLoginData] = useState({
    email: null,
    password: null,
  });

  const handleLoginData = useCallback(
    (event, target) => {
      setLoginData({
        ...loginData,
        [target]: event.target.value,
      });
    },
    [loginData],
  );

  const toLogin = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await signInWithEmailAndPassword(
          auth,
          loginData.email,
          loginData.password,
        );
        setLoading(true);
        Cookies.set("isLoggedIn", "true")
        router.push('/messenger/chats');
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    },
    [auth, loginData],
  );

  return (
    <main className="min-h-96 mx-auto max-w-[50%] flex flex-col justify-center items-center pt-24 gap-10">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3 className="text-2xl font-semibold text-gray-500">
            Please login{' '}
          </h3>
          <div className="border-y border-slate-300 w-full py-10 flex justify-center items-center">
            <form className="w-96 px-10 flex flex-col gap-4" onSubmit={toLogin}>
              <label className="flex flex-col gap-2 justify-center items-start">
                <p className="text-slate-500">Email Address</p>
                <input
                  type="email"
                  className="w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                  onChange={(e) => {
                    handleLoginData(e, 'email');
                  }}
                />
              </label>
              <label className="flex flex-col gap-2 justify-center items-strat">
                <p className="text-slate-500">Password</p>
                <input
                  type="password"
                  className="border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                  onChange={(e) => {
                    handleLoginData(e, 'password');
                  }}
                />
              </label>
              <p className="text-red-600">{error && 'user not found'}</p>
              <button className="w-full py-2 mt-3 rounded-lg font-bold border border-[#039BE5] bg-[#039BE5] text-white transition-colors duration-300 hover:bg-blue-600">
                Login
              </button>
            </form>
          </div>
        </>
      )}
    </main>
  );
}
