import Avatar from "@/app/components/Avatar"

function ChatInfo ({user}) {
    return (
        <div className="flex gap-4">
            <Avatar url={user.photoURL} width={12} height={12} />
            <span className="font-bold">{user.displayName}</span>
        </div>
    )
}

export default ChatInfo