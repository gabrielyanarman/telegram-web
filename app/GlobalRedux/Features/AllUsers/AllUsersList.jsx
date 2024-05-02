'use client'
import { useEffect } from "react"
import { AllUsersSelector, getAllUsersAsync } from "./AllUsersSlice"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import ChatItem from "@/app/components/onProfile/leftColumn/ChatItem"
import Loader from "@/app/components/Loader"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase"

function AllUsersList() {
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(getAllUsersAsync())
    },[])

    const users = useSelector(AllUsersSelector)
    const [thisUser] = useAuthState(auth)

    return (
			<>
				{users.loading ? (
					<div className="w-full flex justify-center pt-10">
						<Loader />
					</div>
				) : (
					users.value.map(user => {
						if (user.uid === thisUser.uid) return null
						return (
							<ChatItem
								key={user.uid}
								displayName={user.displayName}
								photoURL={user.photoURL}
							/>
						)
					})
				)}
			</>
		)
}

export default AllUsersList