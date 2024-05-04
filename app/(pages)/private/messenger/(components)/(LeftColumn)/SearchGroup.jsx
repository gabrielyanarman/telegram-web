"use client"
import { useDispatch } from "react-redux"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useState } from "react"
import { changeSearchValue } from '@/app/redux/slices/searchSlice'

function SearchGroup() {

	const [searchIn,setSearchIn] = useState('chats')
	const dispatch = useDispatch()
	const pathName = usePathname()

	useEffect(() => {
		pathName.includes('messenger/users') ? setSearchIn('users') : setSearchIn('chats')

	},[pathName])
	
    return (
			<div className='flex gap-2 pl-[13px] pt-1'>
				<Link href='/private/messenger/chats'>
					<button
						onClick={() => {
							dispatch(changeSearchValue(''))
						}}
						className={`${
							searchIn == 'chats'
								? 'text-[#3390EC] border-blue-600 rounded-br-none rounded-bl-none'
								: 'text-gray-500 border-transparent'
						} font-semibold text-sm p-2 border-b-2 rounded-md hover:bg-gray-200 transition-all duration-200`}
					>
						Chats
					</button>
				</Link>
				<Link href='/private/messenger/users'>
					<button
						onClick={() => {
							dispatch(changeSearchValue(''))
						}}
						className={`${
							searchIn == 'users'
								? 'text-[#3390EC] border-blue-600 rounded-br-none rounded-bl-none'
								: 'text-gray-500 border-transparent'
						} font-semibold text-sm p-2 rounded-md border-b-2 hover:bg-gray-200 transition-all duration-200`}
					>
						Users
					</button>
				</Link>
			</div>
		)
}

export default SearchGroup