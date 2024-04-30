
function Avatar({url}) {
    return (
        <div className="w-20 h-20 rounded-full overflow-hidden">
            <img src={url} className="object-cover w-20 h-20 rounded-full overflow-hidden"/>
        </div>
    )
}

export default Avatar