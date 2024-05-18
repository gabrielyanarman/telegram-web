'use client';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSearchTab,
  changeSearchValue,
  searchStateSelector,
} from '@/app/redux/slices/searchSlice';

function SearchGroup() {
  const searchTab = useSelector(searchStateSelector).searchTab;
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 pl-[13px] pt-1">
      <button
        onClick={() => {
          dispatch(changeSearchValue(''));
          dispatch(changeSearchTab('chats'));
        }}
        className={`${
          searchTab == 'chats'
            ? 'text-[#3390EC] border-blue-600 dark:text-indigo-500 dark:border-indigo-500 rounded-br-none rounded-bl-none'
            : 'text-gray-500 dark:text-white border-transparent'
        } font-semibold text-sm p-2 border-b-2 rounded-md hover:bg-gray-200 dark:hover:bg-[#414040] transition-all duration-200 focus:outline-0`}
      >
        Chats
      </button>
      <button
        onClick={() => {
          dispatch(changeSearchValue(''));
          dispatch(changeSearchTab('users'));
        }}
        className={`${
          searchTab == 'users'
            ? 'text-[#3390EC] border-blue-600 dark:text-indigo-500 dark:border-indigo-500 rounded-br-none rounded-bl-none'
            : 'text-gray-500 dark:text-white border-transparent'
        } font-semibold text-sm p-2 rounded-md border-b-2 hover:bg-gray-200 dark:hover:bg-[#414040] transition-all duration-200 focus:outline-0`}
      >
        Users
      </button>
    </div>
  );
}

export default SearchGroup;
