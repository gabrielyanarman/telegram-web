'use client'

import { signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "@/app/firebase"
import { useRouter } from "next/navigation"
import Loader from "@/app/components/Loader"
import { useAuthState } from "react-firebase-hooks/auth"

export default function LogIn() {

	const router = useRouter()
	const [loading,setLoading] = useState(false)
	const [user] = useAuthState(auth)

	useEffect(() => {
		if(user) router.push('/private/messenger')
	})

	const [loginData,setLoginData] = useState({
		email: null,
		password: null
	})

	const handleLoginData = (event,target) => {
		setLoginData({
			...loginData,
			[target]: event.target.value
		})
	}

	const toLogin = async (event) => {
		event.preventDefault()
		setLoading(true)
		try {
			await signInWithEmailAndPassword(auth,loginData.email,loginData.password)
			router.push('/private/messenger')
		}
		catch(error) {
			setLoading(false)
			console.log(error)
		}
	}

	return  (
			<main className='min-h-96 mx-auto max-w-[50%] flex flex-col justify-center items-center pt-24 gap-10'>
				{loading ? 
					(<Loader />)
					:
					(
						<>
							<h3 className='text-2xl font-semibold text-gray-500'>Please login </h3>
							<div className='border-y border-slate-300 w-full py-10 flex justify-center items-center'>
								<form className='w-96 px-10 flex flex-col gap-4' onSubmit={toLogin}>
									<label className='flex flex-col gap-2 justify-center items-start'>
										<p className='text-slate-500'>Email Address</p>
										<input
											type='email'
											className='w-full border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md'
											onChange={e => {
												handleLoginData(e, 'email')
											}}
										/>
									</label>
									<label className='flex flex-col gap-2 justify-center items-strat'>
										<p className='text-slate-500'>Password</p>
										<input
											type='password'
											className='border border-slate-300 px-4 py-1 focus:outline-none focus:outline-indigo-400 focus:border-transparent rounded-md'
											onChange={e => {
												handleLoginData(e, 'password')
											}}
										/>
									</label>
									<button className='w-full py-2 mt-6 rounded-lg font-bold border border-[#039BE5] bg-[#039BE5] text-white transition-colors duration-300 hover:bg-blue-600'>
										Login
									</button>
								</form>
							</div>
						</>
					)
				}
			</main>
		)
}