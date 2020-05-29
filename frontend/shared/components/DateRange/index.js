// Next & React
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Components
import { Skeleton } from 'antd';

// Styles
import { StyledButton, StyledGroup } from './Styles';

// Stuff related to the date
import moment from 'moment';

// Apis & Helpers
import { fetchFlightsSerialized } from 'shared/utils/api/skyscannerViaRapidApi';
import { createDateRange } from 'shared/utils/createDateRange';
import { getAlternativePrices } from 'shared/utils/getAlternativePrices';


export function DateRange({setFlights, isReturn = false}){
  // Get initial values from query
  const { query } = useRouter();
  const { origin, destination, departureDate, returnDate } = query;

  // Switch the seed for the dateRange and baseDate based on the source of the request
  const dateRange = isReturn ? createDateRange(returnDate) : createDateRange(departureDate);
  var baseDate = isReturn ? returnDate : departureDate;
  const [selectedDate, setSelectedDate] = useState(baseDate)
  const otherDate = isReturn ? departureDate : returnDate;

  const [loading, setLoading] = useState(true)
  const [flightPrices, setFlightPrices] = useState([])

  useEffect(() => {
    baseDate = isReturn ? returnDate : departureDate;

    getAlternativePrices(origin, destination, dateRange, otherDate, isReturn).then(prices => {
      setFlightPrices(prices);
      setSelectedDate(baseDate);
      setLoading(false);
    })
  },[query])

  return (
    <>
    {loading ?
      <Skeleton.Input style={{ width: '300px' }} active={true} size='large' />
    :
      <StyledGroup
        value={selectedDate}
        onChange={async (e) => {
          setSelectedDate(e.target.value);
          const computedDeparture = isReturn ? departureDate : e.target.value;
          const computedReturn = isReturn ? e.target.value : returnDate;
          fetchFlightsSerialized(origin, destination, computedDeparture, computedReturn).then(res => setFlights(res))
        }}
      >
        { dateRange.map((date, index) =>
            <StyledButton
              key={date}
              value={date}
              disabled={moment(date) < moment().startOf('day')}
            >
              <p>{moment(date).format('ddd, MMM DD')}</p>
              <p>$ {flightPrices[index]}</p>
            </StyledButton>
        )}
      </StyledGroup>
    }
    </>
  )
}