import axios from 'axios'

// Utils
import { getAsString } from 'shared/utils/getAsString';

// Stuff related to the date
import moment from 'moment'
import { STANDARD_DATE_FORMAT } from 'shared/config/globals';
const dateFormat = STANDARD_DATE_FORMAT;

// Define base url for API calls
const BASE_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/`


// API call to retrieve airports matching a user query
export async function fetchAirports(query){
  const url = BASE_URL + `autosuggest/v1.0/IT/USD/en-US/` + `?query=${query}`

  try {
    var airports = await axios({
      url: url,
      headers: {
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.NEXT_PUBLIC_FLIGHTSCANNER_API
      }
    })
  } catch (error) {
    console.log(error)
  }
  
  return airports ? airports.data.Places : null
}




// API call to retrieve flights based on search query (returnDate optional)
export async function fetchFlights(originAirport, destinationAirport, departureDate, returnDate = undefined){
  // Build the URL for the API call
  const url = BASE_URL + `browseroutes/v1.0/US/USD/en-US/` + `${originAirport}/`+ `${destinationAirport}/` + `${departureDate}/` + (returnDate ? `${returnDate}/` : '')


  // Create helper function to render the response data in a sensible way
  // let restructuredData = myData.reduce((a, b) => {
  //   return a.concat([
  //       { "date": b["date"], "here-value": b["here-value"],  "here-color": b["here-color"] },
  //       { "date": b["date"], "there-value": b["there-value"],  "there-color": b["there-color"] }
  //   ]);
  // }, []);


  try {
    var flights = await axios({
      url: url,
      headers: {
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.NEXT_PUBLIC_FLIGHTSCANNER_API
      }
    })
  } catch (error) {
    console.log(error)
  }
  
  return flights ? flights.data : null
}


// Serialize the response data to make it more manageable and only export what makes sense
export async function fetchFlightsSerialized(originAirport, destinationAirport, departureDate, returnDate = undefined){
  const responseRaw = await fetchFlights(originAirport, destinationAirport, departureDate, returnDate);

  let reducedRes = [];

  // Refactor the data
  if (responseRaw) {
    reducedRes = responseRaw.Quotes.reduce((acc, quote) => {
      //Define the base data to pull from
      const originData = responseRaw.Places.find(place => place.PlaceId == quote.OutboundLeg.OriginId);
      const destinationData = responseRaw.Places.find(place => place.PlaceId == quote.OutboundLeg.DestinationId);
    
      const inboundOriginData = returnDate ? responseRaw.Places.find(place => place.PlaceId == quote.InboundLeg.OriginId) : undefined;
      const inboundDestinationData = returnDate ? responseRaw.Places.find(place => place.PlaceId == quote.InboundLeg.DestinationId) : undefined;

      return acc.concat({
        price: quote.MinPrice,

        origin: originData.CityName, 
        originCode: originData.IataCode,
        destination: destinationData.CityName,
        destinationCode: destinationData.IataCode,
        departureDate: moment(`${quote.OutboundLeg.DepartureDate}`).format(dateFormat),
        outboundCarrier: responseRaw.Carriers.find(carrier => carrier.CarrierId == getAsString(quote.OutboundLeg.CarrierIds)).Name,

        inboundOrigin: returnDate ? inboundOriginData.CityName : null,
        inboundOriginCode: returnDate ? inboundOriginData.IataCode : null,
        inboundDestination: returnDate ? inboundDestinationData.CityName : null,
        inboundDestinationCode: returnDate ? inboundDestinationData.IataCode : null,
        returnDate: returnDate ? moment(`${quote.InboundLeg.DepartureDate}`).format(dateFormat) : null,
        inboundCarrier: returnDate ? responseRaw.Carriers.find(carrier => carrier.CarrierId == getAsString(quote.InboundLeg.CarrierIds)).Name : null,
      })
    }, []);
  }

  // Filter out only for the response that actually matches the query
  const finalResponse = reducedRes.filter(function(quote) {
    return (quote.departureDate == departureDate && (returnDate ? quote.returnDate == returnDate : true));
  });

  return finalResponse.length>0 ? finalResponse : null;
}