import ChatList from "./ChatList"
import LeftColumnHeader from "./LeftColumnHeader"
import MessengerList from "./MessengerList"
import SearchGroup from "./SearchGroup"

function LeftColumn() {
    return (
        <div className="my-shadow-r w-1/4 h-full flex flex-col relative">
            <LeftColumnHeader />
            <SearchGroup />
            <MessengerList />
        </div>
    )
}

export default LeftColumn