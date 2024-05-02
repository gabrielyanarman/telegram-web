import ChatInfo from "./ChatInfo"
import HeaderActions from "./HeaderActions"

function MiddleColumnHeader() {
    return (
			<div className='py-2 pr-3 pl-6 my-shadow-b flex justify-between'>
				<ChatInfo
					user={{
						displayName: 'Default Default',
						photoURL:
							'https://firebasestorage.googleapis.com/v0/b/my-telegram-app-1.appspot.com/o/users%2Fdefault_avatar.jpg?alt=media&token=53b6b7d6-0c12-44ae-a67f-f92ecb3cefd8',
					}}
				/>
				<HeaderActions />
			</div>
		)
}

export default MiddleColumnHeader