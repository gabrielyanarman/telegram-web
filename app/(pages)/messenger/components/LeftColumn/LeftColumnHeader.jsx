'use client';

import LeftColumnSearch from './LeftColumnSearch';

function LeftColumnHeader() {
  return (
    <div className="flex justify-start items-center w-full pt-2 pb-[6px] pl-[13px] pr-2">
      <LeftColumnSearch />
    </div>
  );
}

export default LeftColumnHeader;
