'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  changeSearchValue,
  searchStateSelector,
} from '@/app/redux/slices/searchSlice';

function LeftColumnSearch() {
  const [inputFocus, setInputFocus] = useState(false);
  const dispatch = useDispatch();
  const searchValue = useSelector(searchStateSelector).value;

  return (
    <div className="flex justify-center relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`${
          inputFocus ? 'text-[#039BE5] dark:text-indigo-600' : 'text-gray-500'
        } w-5 h-5  absolute left-4 top-[50%] -translate-y-[50%]`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        className="bg-[#F4F4F5] pt-2 pr-[41px] pb-2 pl-[43px] rounded-2xl w-full focus:outline-none focus:outline-[#039BE5] dark:text-black dark:focus:outline-indigo-600"
        onFocus={() => {
          setInputFocus(true);
        }}
        onBlur={() => {
          setInputFocus(false);
        }}
        onChange={(e) => {
          dispatch(changeSearchValue(e.target.value));
        }}
      />
    </div>
  );
}

export default LeftColumnSearch;
