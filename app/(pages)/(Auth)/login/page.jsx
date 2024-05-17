'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '@/app/firebase';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import Cookies from 'js-cookie';
import { LoginSchema } from './schemas';

export default function LogIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [currentUser, currentUserLoading] = useAuthState(auth);

  useEffect(() => {
    if (currentUserLoading) return;
    if (currentUser) router.push('/messenger/chats');
  }, [currentUser]);

  const toLogin = useCallback(
    async (data) => {
      try {
        await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password,
        );
        setLoading(true);
        Cookies.set('isLoggedIn', 'true');
        router.push('/messenger/chats');
        reset()
      } catch (error) {
        setError(true)
        setLoading(false);
      }
    },
    [auth],
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'onTouched',
  });

  return (
    <main className="min-h-96 mx-auto max-w-[50%] flex flex-col justify-center items-center pt-16 sm:pt-24 gap-10">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3 className="text-2xl font-semibold text-gray-500">
            Please login{' '}
          </h3>
          <div className="border-y border-slate-300 w-full py-10 flex justify-center items-center">
            <form className="w-96 px-10 flex flex-col gap-4" onSubmit={handleSubmit(toLogin)}>
              <label className="flex flex-col gap-2 justify-center items-start">
                <p className="text-slate-500">Email Address</p>
                <input
                  type="email"
                  className="w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                  {...register('email')}
                />
                {errors.email && (
                  <small className="text-red-600 text-sm max-w-full">
                    {errors.email.message}
                  </small>
                )}
              </label>
              <label className="flex flex-col gap-2 justify-center items-strat">
                <p className="text-slate-500">Password</p>
                <input
                  type="password"
                  className="border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                  {...register('password')}
                />
                {errors.password && (
                  <small className="text-red-600 text-sm max-w-full">
                    {errors.password.message}
                  </small>
                )}
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
