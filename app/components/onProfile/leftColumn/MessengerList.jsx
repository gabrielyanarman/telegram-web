import AllUsersList from "@/app/GlobalRedux/Features/AllUsers/AllUsersList"

function MessengerList() {
    return (
			<div className='overflow-y-auto'>
				<div className='py-3 px-2 flex flex-col gap-1'>
					<AllUsersList />
				</div>
			</div>
		)
}

export default MessengerList