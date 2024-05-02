'use client'

import AllUsersList from "@/app/GlobalRedux/Features/AllUsers/AllUsersList"
import ChatList from "@/app/GlobalRedux/Features/UserChats/ChatList"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllUsersAsync } from "@/app/GlobalRedux/Features/AllUsers/AllUsersSlice"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"
import { getChatsForUserAsync } from "@/app/GlobalRedux/Features/UserChats/ChatListSlice"

function MessengerList({searchIn}) {

	const dispatch = useDispatch()
	const [user] = useAuthState(auth)
	
	useEffect(() => {
		dispatch(getAllUsersAsync())
		dispatch(getChatsForUserAsync(user.uid))
	}, [])

    return (
			<div className='overflow-y-auto'>
				<div className='py-3 px-2 flex flex-col gap-1'>
					{searchIn == 'chats' ?
						<ChatList />
						:
						<AllUsersList />						
					}
				</div>
			</div>
		)
}

export default MessengerList