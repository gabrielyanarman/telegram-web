'use client'

import { AllUsersSelector } from "./AllUsersSlice"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import ChatItem from "@/app/components/onProfile/leftColumn/ChatItem"
import Loader from "@/app/components/Loader"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"
import { doc, setDoc } from "firebase/firestore"
import { firestore } from "@/app/firebase"
import { getChatsForUserAsync } from "../UserChats/ChatListSlice"
import { searchValueSelector } from "../LeftColumnSearch/SearchSlice"

function AllUsersList() {

    const users = useSelector(AllUsersSelector)
    const [thisUser] = useAuthState(auth)
	const searchValue = useSelector(searchValueSelector).value

	/* jamanakavor */
	const dispatch = useDispatch()

	const addChatonCollection = async (user1Id,user2Id,chatId) => {
		const href = chatId.split('').sort().join('')
		await setDoc(doc(firestore, `chats/${href}`), {
			chatId,
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
									addChatonCollection(
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

export default AllUsersList