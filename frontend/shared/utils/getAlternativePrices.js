// Stuff related to the date
import moment from 'moment';

// Apis & Helpers
import { fetchFlightsSerialized } from 'shared/utils/api/skyscannerViaRapidApi';


export const getAlternativePrices = async (origin, destination, dateRange, otherDate = undefined, isReturn = false) => {
  if (isReturn) {
    return Promise.all(dateRange.map(date => {
      if (moment(date) >= moment().startOf('day')) {
        return fetchFlightsSerialized(origin, destination, otherDate, date).then(
          res => (res && res.length>0) ? res.reduce((prev, curr) => prev.price < curr.price ? prev : curr).price : "-"
        )
      } else {
        return "-"
      }
    }))
  } else {
    return Promise.all(dateRange.map(date => {
      if (moment(date) >= moment().startOf('day')) {
        return fetchFlightsSerialized(origin, destination, date, otherDate).then(
          res => (res && res.length>0) ? res.reduce((prev, curr) => prev.price < curr.price ? prev : curr).price : "-"
        )
      } else {
        return "-"
      }
    }))
  }
}