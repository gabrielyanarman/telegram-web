import { usePathname, useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { auth, firestore } from '@/app/firebase'
import { chatsSelector, getChatsForUserAsync } from "@/app/redux/slices/chatsSlice"
import Avatar from '@/app/components/Avatar'
import { findParticipantUser } from "@/app/utils/functions"
import { usersSelector } from "@/app/redux/slices/usersSlice"

function ChatItem({user, chat}) {

	const [selectedUser,setSelectedUser] = useState({})
	const router = useRouter()
	const dispatch = useDispatch()
	const [thisUser] = useAuthState(auth)
	const pathName = usePathname()
	const users = useSelector(usersSelector)
	const chats = useSelector(chatsSelector)

	const addChatOnCollection = async (user1Id, user2Id) => {
		const chatId = `${user1Id}-${user2Id}`.split('').sort().join('')
		await setDoc(doc(firestore, `chats/${chatId}`), {
			chatId: chatId,
			participants: [user1Id, user2Id],
			lastMessage: '',
			timestamp: '',
		})
		dispatch(getChatsForUserAsync(user1Id))
	}

	useEffect(() => {
		const lastPartPath = pathName.split('/:').at(-1)
		const openedChat = chats.data[lastPartPath]
		if (!openedChat) return 
		const user = findParticipantUser(thisUser, openedChat, users)
		setSelectedUser(user)
	},[pathName,users.loading,chats.loading])
	
    return (
			<div
				className={`${
					(selectedUser.uid == user.uid) &&
					pathName.includes('messenger/chats')
						? 'bg-[#3390EC] hover:bg-[#3390EC]'
						: 'hover:bg-gray-100'
				} pt-3 px-2 pb-2 rounded-2xl transition-all duration-300 cursor-pointer`}
				onClick={e => {
					e.preventDefault()
					if (chat) {
						router.push(`/private/messenger/chats/:${chat.chatId}`)
					} else {
						addChatOnCollection(
							thisUser.uid,
							user.uid
						)
						const chatId = `${thisUser.uid}-${user.uid}`.split('').sort().join('')
						router.push(`/private/messenger/chats/:${chatId}`)
					}
				}}
			>
				<div className='flex w-full gap-4'>
					<div>
						<Avatar url={user.photoURL} width={12} height={12} />
					</div>
					<div>
						<span
							className={`${
								(selectedUser.uid == user.uid) &&
								pathName.includes('messenger/chats')
									? 'text-white'
									: null
							} font-semibold transition-all duration-300`}
						>
							{user.displayName}
						</span>
					</div>
				</div>
			</div>
		)
}

export default ChatItem