'use client'
import { useSelector } from 'react-redux'
import ChatItem from '../(components)/(LeftColumn)/ChatItem'
import { chatsSelector } from '@/app/redux/slices/chatsSlice'
import Loader from '@/app/components/Loader'
import { usersSelector } from '@/app/redux/slices/usersSlice'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase'
import { searchValueSelector } from '@/app/redux/slices/searchSlice'

export default function ChatsListLayout({ children }) {
	const users = useSelector(usersSelector)
	const [thisUser] = useAuthState(auth)
	const chats = useSelector(chatsSelector)
	const searchValue = useSelector(searchValueSelector).value

	return (
		<>
			{chats.loading ? (
				<div className='w-full flex justify-center pt-10'>
					<Loader />
				</div>
			) : Object.keys(chats.data).length ? (
				Object.values(chats.data).map(chat => {
					const uid = chat.participants.find(uid => uid != thisUser.uid)
					const user = users.data[uid]
					return user.displayName
						.toLowerCase()
						.includes(searchValue.toLowerCase()) ? (
							<ChatItem key={chat.chatId} user={user} chat={chat} />
					) : null
				})
			) : (
				<div className='w-full flex justify-center pt-10'>
					<span className='text-gray-500 font-semibold'>no chats found</span>
				</div>
			)}
		</>
	)
}
