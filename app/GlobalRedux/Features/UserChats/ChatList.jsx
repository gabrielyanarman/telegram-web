'use client'

import { useSelector } from "react-redux"
import ChatItem from "../../../components/onProfile/leftColumn/ChatItem"
import {  userChatsSelector } from "./ChatListSlice"
import Loader from "@/app/components/Loader"
import { AllUsersSelector } from "../AllUsers/AllUsersSlice"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"

function ChatList() {

	const users = useSelector(AllUsersSelector)
	const [thisUser] = useAuthState(auth)
	const userChats = useSelector(userChatsSelector)

    return (
			<>
				{userChats.loading ? (
					<div className='w-full flex justify-center pt-10'>
						<Loader />
					</div>
				) : userChats.value.length ? (
					userChats.value.map(chat => {
						const user = users.value.find(item => {
							const uid = chat.participants.find(uid => uid != thisUser.uid)
							return item.uid == uid ? item : null
						})
						return (
							<ChatItem
								key={chat.chatId}
								displayName={user.displayName}
								photoURL={user.photoURL}
							/>
						)
					})
				) : (
					<div className='w-full flex justify-center pt-10'>
						<span className="text-gray-500 font-semibold">no chats found</span>
					</div>
				)}
			</>
		)
}

export default ChatList