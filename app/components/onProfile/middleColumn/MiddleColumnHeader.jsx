import ChatInfo from "./ChatInfo"
import HeaderActions from "./HeaderActions"

function MiddleColumnHeader() {
    return (
			<div className='py-2 pr-3 pl-6 my-shadow-b flex justify-between'>
				<ChatInfo
					user={{
						displayName: 'Arman Gabrielyan',
						photoURL:
							'https://firebasestorage.googleapis.com/v0/b/my-telegram-app-1.appspot.com/o/users%2FUFcPUeeZpUcOzc5M9QpWcHRwELx1.jpg?alt=media&token=67f558ae-630a-4667-86ab-cdc5b94199a8',
					}}
				/>
                <HeaderActions />
			</div>
		)
}

export default MiddleColumnHeader