function Avatar({ url, width, height }) {
  return (
    <div
      className={`w-${width} h-${height} rounded-full overflow-hidden`}
    >
      <img
        src={url}
        className={`object-cover w-${width} h-${height} rounded-full overflow-hidden`}
      />
    </div>
  );
}

export default Avatar;
