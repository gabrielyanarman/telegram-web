'use client'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "@/app/firebase"
import Loader from '@/app/components/Loader'
import LeftColumn from '@/app/components/onProfile/leftColumn/LeftColumn'
import MiddleColumn from '@/app/components/onProfile/middleColumn/MiddleColumn'


function Messenger() {
    const [user,loading] = useAuthState(auth)
	
	if(user === null || loading) {
		return (
			<div className='w-full min-h-96 flex justify-center items-center'>
				<Loader />
			</div>
		)
	}
    return (
			<div className='w-full h-[calc(100vh-81px)] flex relative'>
				<LeftColumn /> 
				<MiddleColumn />
			</div>
		)
}

export default Messenger