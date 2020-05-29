// Next & React
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

// Stuff related to the date
import moment from 'moment';
import { STANDARD_DATE_FORMAT } from 'shared/config/globals';
const dateFormat = STANDARD_DATE_FORMAT;


export function useInitialValuesFromQuery(){
  // Set the initial values of the form
  const [initialValues, setInitialValues] = useState({})

  // Get parameters from url
  const { query } = useRouter();

  // @todo try replacing the useEffect hook with getInitialProps or getServerSideProps
  // Define the initial values for the search form (if present)
  useEffect(()=> {
    if(query) {
      const departureDate = query.departureDate ? moment(query.departureDate, dateFormat) : undefined;
      const rangeDate = (query.departureDate && query.returnDate) ? [moment(query.departureDate, dateFormat), moment(query.returnDate, dateFormat)] : undefined

      setInitialValues({
        origin: query.origin,
        destination: query.destination,
        departureDate: departureDate,
        rangeDate: rangeDate
      })
    }
  }, [query])

  return initialValues
}