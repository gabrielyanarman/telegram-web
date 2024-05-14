'use client';

import { useCallback, useState } from 'react';
import {
  EMAIL_REGEXP,
  ERROR_MESSAGES,
  PASSWORD_REGEXP,
} from '@/app/utils/consts';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { storage, auth, firestore } from '@/app/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [tryLogin, setTryLogin] = useState(false);

  const emptyUser = {
    firstName: {
      value: '',
      error: ERROR_MESSAGES.firstName,
    },
    lastName: {
      value: '',
      error: ERROR_MESSAGES.lastName,
    },
    email: {
      value: '',
      error: ERROR_MESSAGES.email,
    },
    password: {
      value: '',
      error: ERROR_MESSAGES.password,
    },
    copyPassword: {
      value: '',
      error: ERROR_MESSAGES.copyPassword,
    },
    image: {
      value: '',
      error: '',
    },
  };
  const [newUser, setNewUser] = useState(emptyUser);
  const router = useRouter();

  const handleNewUser = useCallback(
    (event, target, err = null) => {
      setNewUser({
        ...newUser,
        [target]: {
          value: event.target.value,
          error: err ? ERROR_MESSAGES[target] : null,
        },
      });
    },
    [newUser, ERROR_MESSAGES],
  );

  const addUserOnCollection = useCallback(
    async (user) => {
      await setDoc(doc(firestore, `users/${user.uid}`), {
        displayName: user.displayName,
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
      });
    },
    [firestore],
  );

  const handleImageUpload = useCallback(
    async (file, user) => {
      const storageRef = ref(storage, `/users/${user.uid}.jpg`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        return newUser.image.value
          ? await getDownloadURL(storageRef)
          : await getDownloadURL(ref(storage, '/users/default_avatar.jpg'));
      } catch (error) {
        console.error('Error loading image:', error);
      }
    },
    [newUser, storage],
  );

  const toRegister = useCallback(async () => {
    setLoading(true);
    try {
      const user = (
        await createUserWithEmailAndPassword(
          auth,
          newUser.email.value,
          newUser.password.value,
        )
      ).user;
      const photoURL = await handleImageUpload(newUser.image.value, user);

      await updateProfile(user, {
        displayName: `${newUser.firstName.value} ${newUser.lastName.value}`,
        photoURL,
      });
      await addUserOnCollection(user);
      router.push('/messenger/chats');
      setNewUser(emptyUser);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [auth, newUser, emptyUser]);

  return (
    <main className="min-h-96 mx-auto max-w-[50%] flex flex-col justify-center items-center pt-10 gap-6">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3 className="text-2xl font-semibold text-gray-500 mb-4">
            Please register
          </h3>
          <div className="border-y border-slate-300 w-full py-10 flex justify-center items-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTryLogin(true);
                for (let data in newUser) {
                  if (newUser[data]['error']) return;
                }
                toRegister();
              }}
              className="w-full px-10 flex flex-col gap-5 justify-center items-center"
            >
              <div className="w-full flex flex-col gap-5 justify-center items-center">
                <div className="w-full flex gap-12 items-start">
                  <label className="flex flex-col gap-2 justify-center items-start w-1/2">
                    <p className="text-slate-500">Your name</p>
                    <input
                      type="text"
                      className="w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                      onChange={(e) => {
                        e.target.value.length
                          ? handleNewUser(e, 'firstName')
                          : handleNewUser(
                              e,
                              'firstName',
                              ERROR_MESSAGES.firstName,
                            );
                      }}
                    />
                    {newUser.firstName.error && tryLogin ? (
                      <p className="text-red-600 text-sm">
                        {newUser.firstName.error}
                      </p>
                    ) : (
                      <p className="h-5"></p>
                    )}
                  </label>
                  <label className="flex flex-col gap-2 justify-center items-start w-1/2">
                    <p className="text-slate-500">Your surname</p>
                    <input
                      type="text"
                      className="w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                      onChange={(e) => {
                        e.target.value.length
                          ? handleNewUser(e, 'lastName')
                          : handleNewUser(
                              e,
                              'lastName',
                              ERROR_MESSAGES.lastName,
                            );
                      }}
                    />
                    {newUser.lastName.error && tryLogin ? (
                      <p className="text-red-600 text-sm">
                        {newUser.lastName.error}
                      </p>
                    ) : (
                      <p className="h-5"></p>
                    )}
                  </label>
                </div>
                <div className="w-full flex gap-12 items-start">
                  <label className="flex flex-col gap-2 justify-center items-start w-1/2">
                    <p className="text-slate-500">Email Address</p>
                    <input
                      type="email"
                      className="w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                      onChange={(e) => {
                        EMAIL_REGEXP.test(e.target.value)
                          ? handleNewUser(e, 'email')
                          : handleNewUser(e, 'email', ERROR_MESSAGES.email);
                      }}
                    />
                    {newUser.email.error && tryLogin ? (
                      <p className="text-red-600 text-sm">
                        {newUser.email.error}
                      </p>
                    ) : (
                      <p className="h-5"></p>
                    )}
                  </label>
                  <label className="flex flex-col gap-2 justify-center items-start w-1/2">
                    <p className="text-slate-500">Password</p>
                    <input
                      type="password"
                      className="w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                      onChange={(e) => {
                        PASSWORD_REGEXP.test(e.target.value)
                          ? handleNewUser(e, 'password')
                          : handleNewUser(
                              e,
                              'password',
                              ERROR_MESSAGES.password,
                            );
                      }}
                    />
                    {newUser.password.error && tryLogin ? (
                      <p className="text-red-600 text-sm">
                        {newUser.password.error}
                      </p>
                    ) : (
                      <p className="h-5"></p>
                    )}
                  </label>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex gap-12 items-center">
                  <label className="flex flex-col gap-2 justify-center items-start w-1/2">
                    <p className="text-slate-500">Copy password</p>
                    <input
                      type="password"
                      className="w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                      onChange={(e) => {
                        e.target.value == newUser.password.value
                          ? handleNewUser(e, 'copyPassword')
                          : handleNewUser(
                              e,
                              'copyPassword',
                              ERROR_MESSAGES.copyPassword,
                            );
                      }}
                    />
                    {newUser.copyPassword.error && tryLogin ? (
                      <p className="text-red-600 text-sm">
                        {newUser.copyPassword.error}
                      </p>
                    ) : (
                      <p className="h-5"></p>
                    )}
                  </label>
                  <label
                    htmlFor="file-upload"
                    className={`w-1/2 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center transition-all duration-300 ${
                      newUser.image.value
                        ? 'bg-green-500 hover:bg-green-700'
                        : 'bg-indigo-500 hover:bg-indigo-700'
                    }`}
                  >
                    {newUser.image.value ? 'File selected' : 'Add a photo'}
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/jpeg"
                    onChange={(e) => {
                      setNewUser({
                        ...newUser,
                        image: {
                          ...newUser.image,
                          value: e.target.files[0],
                        },
                      });
                    }}
                  ></input>
                </div>
              </div>
              <button className="w-1/2 py-2 mt-4 rounded-lg font-bold border border-[#039BE5] bg-[#039BE5] text-white transition-colors duration-300 hover:bg-blue-600">
                Register
              </button>
            </form>
          </div>
        </>
      )}
    </main>
  );
}
