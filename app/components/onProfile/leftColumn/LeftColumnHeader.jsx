'use client'

import LeftColumnSearch from "@/app/GlobalRedux/Features/LeftColumnSearch/LeftColumnSearch"
import { useState } from "react"

function LeftColumnHeader() {
	const [inputFocus, setInputFocus] = useState(false)
    return (
			<div className='flex justify-start items-center gap-4 w-full pt-2 pb-[6px] pl-[13px] pr-2'>
				<div>
					{inputFocus ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-7 h-7 cursor-pointer'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
							/>
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-7 h-7 cursor-pointer'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
							/>
						</svg>
					)}
				</div>
				<LeftColumnSearch inputFocus={inputFocus} setInputFocus={setInputFocus} />
			</div>
		)
}

export default LeftColumnHeader