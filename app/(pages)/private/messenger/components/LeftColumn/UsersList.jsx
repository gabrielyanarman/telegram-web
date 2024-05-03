'use client'

import { usersSelector } from "@/app/redux/slices/usersSlice"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import ChatItem from "./ChatItem"
import Loader from "@/app/components/Loader"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"
import { doc, setDoc } from "firebase/firestore"
import { firestore } from "@/app/firebase"
import { getChatsForUserAsync } from "@/app/redux/slices/chatsSlice"
import { searchValueSelector } from "@/app/redux/slices/searchSlice"

function UsersList() {

    const users = useSelector(usersSelector)
    const [thisUser] = useAuthState(auth)
	const searchValue = useSelector(searchValueSelector).value

	/* jamanakavor */
	const dispatch = useDispatch()

	const addChatOnCollection = async (user1Id,user2Id,chatId) => {
		const href = chatId.split('').sort().join('')
		await setDoc(doc(firestore, `chats/${href}`), {
			chatId: chatId,
			participants: [user1Id, user2Id],
			lastMessage: '',
			timestamp: '',
		})
	}

	const updateUserChatState = (uid) => {
		dispatch(getChatsForUserAsync(uid))
	}

	/* --- */

    return (
			<>
				{users.loading ? (
					<div className='w-full flex justify-center pt-10'>
						<Loader />
					</div>
				) : Object.keys(users.data).length > 1 ? (
					Object.values(users.data).map(user => {
						if (user.uid === thisUser.uid || !user.displayName.toLowerCase().includes(searchValue.toLowerCase())) return null
						return (
							<div
								key={user.uid}
								onClick={() => {
									addChatOnCollection(
										thisUser.uid,
										user.uid,
										`${thisUser.uid}-${user.uid}`
									)
									updateUserChatState(thisUser.uid)
								}}
							>
								<ChatItem
									displayName={user.displayName}
									photoURL={user.photoURL}
								/>
							</div>
						)
					})
				) : (
					<div className='w-full flex justify-center pt-10'>
						<span className='text-gray-500 font-semibold'>no users found</span>
					</div>
				)}
			</>
		)
}

export default UsersList