'use client'

import { useState } from "react"

function LeftColumnHeader() {
    const [inputFocus,setInputFocus] = useState(false)

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
				<div className='flex justify-center relative'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className={`${
							inputFocus ? 'text-[#039BE5]' : 'text-gray-500'
						} w-5 h-5  absolute left-4 top-[50%] -translate-y-[50%]`}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
						/>
					</svg>
					<input
						type='text'
						placeholder='Search'
						className='bg-[#F4F4F5] pt-2 pr-[41px] pb-2 pl-[43px] rounded-2xl w-full focus:outline-[#039BE5]'
						onFocus={() => {
							setInputFocus(true)
						}}
						onBlur={() => {
							setInputFocus(false)
						}}
					/>
				</div>
			</div>
		)
}

export default LeftColumnHeader