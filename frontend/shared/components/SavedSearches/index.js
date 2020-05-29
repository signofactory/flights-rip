import { useState, useEffect } from 'react';
import Router from 'next/router';

// Components
import { Empty, Divider, Typography, List, Button } from 'antd';
import { ListItemStyled, RightSide } from './Styles';
import Emoji from 'shared/components/Emoji'
import Api from 'shared/utils/Api';
const { Title } = Typography

//Recoil
import {currentUser, searchHistoryState} from 'shared/store/recoilState'
import {useRecoilState, useRecoilValue } from 'recoil';


export const SavedSearches = () => {
  const user = useRecoilValue(currentUser);

  const [data, setData] = useRecoilState(searchHistoryState)

  // Helper funtion to laod saved searches
  const loadSearch = (item) => {
    const query = {
      origin: `${item.origin}-sky`,
      destination: `${item.destination}-sky`,
      departureDate: item.departureDate,
      returnDate: item.returnDate ? item.returnDate : null
    }


    Router.push({
      pathname:'/search',
      query: query
    })
  }

  const deleteSearch = (searchId) => (event) => {
    //Stops parent function from being called
    event.stopPropagation()

    //Calls API to delete search and refreshes atom containing searches
    Api.deleteSearch(searchId).then(() => {
      var tempData = data
      tempData = tempData.filter(item => item._id !== searchId)
      setData(tempData)
    })
  }
  
  return (
    <>
      <Title level={3}><Emoji symbol="⏳"/> Search history</Title>
      <Divider style={{ borderColor: '#d9d9d9', margin: '18px 0' }}/>

      {/* If the user is not logged in display Log in to save searches */}
      {
        user ? (
          (data && data.length>0) ?
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <ListItemStyled
                  key={item._id}
                  onClick={() => loadSearch(item)}
                >
                  <List.Item.Meta
                    title={`${item.origin} --> ${item.destination}`}
                    description={item.departureDate}
                  />
                  <RightSide>
                    <span>$ {item.price}</span>
                    <Button className='delete-button' type="link" danger onClick = {deleteSearch(item._id)}>Delete</Button>
                  </RightSide>
                </ListItemStyled>
              )}
            />
          :
          <Empty
            description="It seems you haven't saved any searches yet"
          />
        )
        :
        <Empty
          description="Log in to start saving searches"
        />
      }
    </>
  );
}