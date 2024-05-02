'use client'

import { useState } from "react"

function SearchGroup() {
    const [selected,setSelected] = useState(null)
    return (
			<div className='flex gap-2 pl-[13px] pt-1'>
				<button
					onClick={() => {
						setSelected('chats')
					}}
					className={`${
						selected == 'chats'
							? 'text-[#3390EC] border-blue-600 rounded-br-none rounded-bl-none'
							: 'text-gray-500 border-transparent'
					} font-semibold text-sm p-2 border-b-2 rounded-md hover:bg-gray-200 transition-all duration-200`}
				>
					Chats
				</button>
				<button
					onClick={() => {
						setSelected('users')
					}}
					className={`${
						selected == 'users'
							? 'text-[#3390EC] border-blue-600 rounded-br-none rounded-bl-none'
							: 'text-gray-500 border-transparent'
					} font-semibold text-sm p-2 rounded-md border-b-2 hover:bg-gray-200 transition-all duration-200`}
				>
					Users
				</button>
			</div>
		)
}

export default SearchGroup