//React
import { useEffect, useState } from 'react'

//Recoil
import {useRecoilState} from 'recoil'
import {currentUser, searchHistoryState} from 'shared/store/recoilState'

import Api from 'shared/utils/Api'

export function DataProvider({ children }) {
  const [user, setUser] = useRecoilState(currentUser);
  const [searchHistory, setSearchHistory] = useRecoilState(searchHistoryState);

  useEffect(() => {
    const fetchSearch = async () => {
      const result = await Api.getUserSearches()
      setSearchHistory(result)
    };

    const fetchData = async () => {
      await Api.getCurrentUser().then(response => {
        (response) && fetchSearch();


        setUser(response)
      })
    };

    (!user) && fetchData();

  }, []);

  // if (user) {
  //   const searchHistory = Api.getUserSearches()
  //   setSearchHistory(searchHistory)
  // }

  // console.log(user)


  return (
    <>
      {children}
    </>
  )
}