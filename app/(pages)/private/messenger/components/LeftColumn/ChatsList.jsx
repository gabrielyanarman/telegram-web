'use client'

import { useSelector } from "react-redux"
import ChatItem from "./ChatItem"
import { chatsSelector } from "@/app/redux/slices/chatsSlice"
import Loader from "@/app/components/Loader"
import { usersSelector } from "@/app/redux/slices/usersSlice"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"
import { searchValueSelector } from "@/app/redux/slices/searchSlice"

function ChatsList() {

	const users = useSelector(usersSelector)
	const [thisUser] = useAuthState(auth)
	const userChats = useSelector(chatsSelector)
	const searchValue = useSelector(searchValueSelector).value

    return (
			<>
				{userChats.loading ? (
					<div className='w-full flex justify-center pt-10'>
						<Loader />
					</div>
				) : Object.keys(userChats.data).length ? (
					Object.values(userChats.data).map(chat => {
						const uid = chat.participants.find(uid => uid != thisUser.uid)
						const user = users.data[uid]
						return user.displayName.toLowerCase().includes(searchValue.toLowerCase()) ?
						 (
							<ChatItem
								key={chat.chatId}
								displayName={user.displayName}
								photoURL={user.photoURL}
							/>
						)
						:
						null
					})
				) : (
					<div className='w-full flex justify-center pt-10'>
						<span className='text-gray-500 font-semibold'>no chats found</span>
					</div>
				)}
			</>
		)
}

export default ChatsList