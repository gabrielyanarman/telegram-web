'use client'

import UsersList from "./UsersList"
import ChatsList from "./ChatsList"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getUsersAsync } from "@/app/redux/slices/usersSlice"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"
import { getChatsForUserAsync } from "@/app/redux/slices/chatsSlice"

function MessengerList({searchIn}) {

	const dispatch = useDispatch()
	const [user] = useAuthState(auth)
	
	useEffect(() => {
		dispatch(getUsersAsync())
		dispatch(getChatsForUserAsync(user.uid))
	}, [])

    return (
			<div className='overflow-y-auto'>
				<div className='py-3 px-2 flex flex-col gap-1'>
					{searchIn == 'chats' ?
						<ChatsList />
						:
						<UsersList />					
					}
				</div>
			</div>
		)
}

export default MessengerList