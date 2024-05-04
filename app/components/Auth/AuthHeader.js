"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"
import { signOut } from "firebase/auth"
import Link from "next/link"

function AuthHeader() {

	const router = useRouter()
	const [selected,setSelected] = useState('login')
	const pathName = usePathname()
	const [user] = useAuthState(auth)
	
	useEffect(() => {
		const parts = pathName.split('/')
		const lastPart = parts[parts.length - 1]
		if(!lastPart) {
			setSelected('login')
			return
		};
		setSelected(lastPart)
	},[pathName])

	const handleSignOut = async () => {
		try {
			const response = await signOut(auth)
		}
		catch (error) {
			console.log(error)
		}
	} 

    return (
			<div className='w-full flex justify-between pb-4 border-b items-center'>
				<div className='self-start cursor-pointer flex gap-3 justify-center items-center'>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/my-telegram-app-1.appspot.com/o/users%2Flogo.jpg?alt=media&token=046ff22c-12a1-486a-9d85-69e35cfd5cd6'
						className='w-12 h-12'
						alt='logo'
					/>
					<span className='text-lg text-[#039BE5] font-bold'>Telegram</span>
				</div>
				{user ? (
					<div className='flex gap-5 justify-center items-center'>
						<button
							className={`transition-all border-[#039BE5] bg-[#039BE5] hover:bg-blue-600 text-white duration-300 px-3 py-2 text-[15px] rounded-lg font-semibold border`}
							onClick={async () => {
								router.push('/')
								await handleSignOut()
							}}
						>
							<span className='flex gap-1 justify-center items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-6 h-6 text-white'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15'
									/>
								</svg>
								Log out
							</span>
						</button>
					</div>
				) : (
					<div className='flex gap-5 justify-center items-center'>
						<Link href='/public/register'>
							<button
								className={`transition-all duration-300 px-3 py-2 text-[15px] rounded-lg font-semibold border border-slate-500 ${
									selected == 'register'
										? 'border-[#039BE5] text-white bg-[#039BE5]'
										: 'text-slate-500'
								}`}
							>
								<span className='flex gap-1 justify-center items-center'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='currentColor'
										className='w-5 h-5'
									>
										<path d='M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z' />
									</svg>
									Register
								</span>
							</button>
						</Link>
						<Link href='/public/login'>
							<button
								className={`transition-all duration-300 px-3 py-2 text-[15px] rounded-lg font-semibold border border-slate-500 ${
									selected == 'login'
										? 'border-[#039BE5] text-white bg-[#039BE5]'
										: 'text-slate-500'
								}`}
							>
								<span className='flex gap-1 justify-center items-center'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='currentColor'
										className='w-5 h-5'
									>
										<path
											fillRule='evenodd'
											d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
											clipRule='evenodd'
										/>
									</svg>
									Login
								</span>
							</button>
						</Link>
					</div>
				)}
			</div>
		)
}

export default AuthHeader