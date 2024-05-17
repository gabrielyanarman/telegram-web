'use client';

import { useCallback, useState } from 'react';
import { RegistrationSchema } from './schemas';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { storage, auth, firestore } from '@/app/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState(null)

  const emptyUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    copyPassword: '',
    image: null,
  };
  
  const router = useRouter();

  const addUserOnCollection = useCallback(
    async (user) => {
      await setDoc(doc(firestore, `users/${user.uid}`), {
        displayName: user.displayName,
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
      });
    },
    [],
  );

  const handleImageUpload = useCallback(
    async (file, user) => {
      if(!file) return await getDownloadURL(ref(storage, '/users/default_avatar.jpg'));
      const storageRef = ref(storage, `/users/${user.uid}.jpg`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        return  await getDownloadURL(storageRef) 
      } catch (error) {
        console.error('Error loading image:', error);
      }
    },
    [],
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(RegistrationSchema),
    mode: 'onTouched',
  });

  const toRegister = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const user = (
          await createUserWithEmailAndPassword(auth, data.email, data.password)
        ).user;
        const photoURL = await handleImageUpload(data.image, user);

        await updateProfile(user, {
          displayName: `${data.firstName} ${data.lastName}`,
          photoURL,
        });
        await addUserOnCollection(user);
        router.push('/messenger/chats');
        reset();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
    [addUserOnCollection, handleImageUpload, reset, router],
  );

  return (
    <main className="min-h-96 mx-auto max-w-[70%] sm:max-w-[35%] flex flex-col justify-center items-center pt-10 gap-6">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h3 className="text-2xl font-semibold text-gray-500 mb-4">
            Please register
          </h3>
          <div className="border-y border-slate-300 w-full py-10 flex justify-center items-center">
            <form
              onSubmit={handleSubmit(toRegister)}
              className="w-full px-2 ms:px-10 flex flex-col gap-2 sm:gap-4 justify-center items-center"
            >
              <div className="w-full flex flex-col sm:gap-5 gap-2 justify-center items-center">
                <div className="w-full flex flex-col sm:flex-row sm:gap-12 gap-2 items-start">
                  <label
                    htmlFor="firstName"
                    className="relative flex flex-col gap-2 justify-center items-start w-full sm:w-1/2"
                  >
                    <p className="text-slate-500">Your name</p>
                    <input
                      type="text"
                      className="w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <small className="text-red-600 text-sm max-w-full">
                        {errors.firstName.message}
                      </small>
                    )}
                  </label>
                  <label
                    htmlFor="lastName"
                    className="flex flex-col gap-2 justify-center items-start w-full sm:w-1/2"
                  >
                    <p className="text-slate-500">Your surname</p>
                    <input
                      type="text"
                      className="w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <small className="text-red-600 text-sm">
                        {errors.lastName.message}
                      </small>
                    )}
                  </label>
                </div>
                <div className="w-full flex flex-col sm:flex-row sm:gap-12 gap-2 items-start">
                  <label
                    htmlFor="email"
                    className="flex flex-col gap-2 justify-center items-start w-full sm:w-1/2"
                  >
                    <p className="text-slate-500">Email Address</p>
                    <input
                      type="email"
                      className="w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                      {...register('email')}
                    />
                    {errors.email && (
                      <small className="text-red-600 text-sm">
                        {errors.email.message}
                      </small>
                    )}
                  </label>
                  <label
                    htmlFor="password"
                    className="flex flex-col gap-2 justify-center items-start w-full sm:w-1/2"
                  >
                    <p className="text-slate-500">Password</p>
                    <input
                      type="password"
                      className="w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                      {...register('password')}
                    />
                    {errors.password && (
                      <small className="text-red-600 text-sm">
                        {errors.password.message}
                      </small>
                    )}
                  </label>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex sm:flex-row flex-col sm:gap-12 gap-2 items-center">
                  <label
                    htmlFor="copyPassword"
                    className="flex flex-col gap-2 justify-center items-start w-full sm:w-1/2"
                  >
                    <p className="text-slate-500">Copy password</p>
                    <input
                      type="password"
                      className="w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md"
                      {...register('copyPassword')}
                    />
                    {errors.copyPassword && (
                      <small className="text-red-600 text-sm">
                        {errors.copyPassword.message}
                      </small>
                    )}
                  </label>
                  <label
                    htmlFor="file-upload"
                    className={`${errors.copyPassword ? 'self-center' : 'self-end'} ${uploadImage ? 'bg-[#27B170] hover:bg-[rgb(39,177,69)]' : ' bg-indigo-500 hover:bg-indigo-700'} w-full sm:w-1/2 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center transition-all duration-300 `}
                  >
                    {uploadImage ? 'File added' : 'Add a photo'}
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/jpeg"
                    {...register('image')}
                    onChange={(event) => {
                      setValue('image', event.target.files[0]);
                      setUploadImage(true);
                    }}
                  ></input>
                </div>
              </div>
              <button className="w-full sm:w-1/2 py-2 mt-4 rounded-lg font-bold border border-[#039BE5] bg-[#039BE5] text-white transition-colors duration-300 hover:bg-blue-600">
                Register
              </button>
            </form>
          </div>
        </>
      )}
    </main>
  );
}