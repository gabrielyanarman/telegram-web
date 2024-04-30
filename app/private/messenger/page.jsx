'use client'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "@/app/firebase"
import Loader from '@/app/components/Loader'
import Avatar from '@/app/components/Avatar'
import ChatBar from '@/app/components/onProfile/chatBar'


function Messenger() {
    const [user,loading] = useAuthState(auth)
	if(user === null || loading) {
		return (
			<div className='w-full min-h-96 flex justify-center items-center'>
				<Loader />
			</div>
		)
	}
	

    return (
			// <main className='mx-auto max-w-[50%] flex flex-col justify-center items-center pt-24 gap-10'>
			// 	Chat page for {user.displayName} <Avatar url={user.photoURL}  />
			// </main>
			<div>
				<ChatBar />
			</div>
		)
}

export default Messenger