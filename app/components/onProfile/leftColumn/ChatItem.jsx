import { useState } from "react"
import Avatar from "../../Avatar"

function ChatItem({displayName,photoURL}) {
    const [selected,setSelected] = useState(false)
    return (
			<div
				className={`${
					selected ? 'bg-[#3390EC] hover:bg-[#3390EC]' : 'hover:bg-gray-100'
				} pt-3 px-2 pb-2 rounded-2xl transition-all duration-300`}
			>
				<a
					className='flex w-full gap-4'
					href='#'
					onClick={e => {
						e.preventDefault()
						setSelected(true)
					}}
				>
					<div>
						<Avatar url={photoURL} width={12} height={12} />
					</div>
					<div>
						<span
							className={`${
								selected ? 'text-white' : null
							} font-semibold transition-all duration-300`}
						>
							{displayName}
						</span>
					</div>
				</a>
			</div>
		)
}

export default ChatItem