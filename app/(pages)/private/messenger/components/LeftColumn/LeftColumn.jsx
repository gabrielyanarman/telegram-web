'use client'

import { useState } from "react"
import LeftColumnHeader from "./LeftColumnHeader"
import SearchGroup from "./SearchGroup"
import MessengerList from "./MessengerList"

function LeftColumn() {
    const [searchIn,setSearchIn] = useState('chats')

    return (
        <div className="my-shadow-r w-1/4 h-full flex flex-col relative">
            <LeftColumnHeader />
            <SearchGroup searchIn={searchIn} setSearchIn={setSearchIn}/>
            <MessengerList searchIn={searchIn}/>
        </div>
    )
}

export default LeftColumn