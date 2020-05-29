// Next & React
import { useRouter } from 'next/router';
import { useState } from 'react';

// Components
import { Layout, Row, Col } from 'antd';
import { SearchForm } from 'shared/components/SearchForm';
import { FlightResults } from 'shared/components/FlightResults'
import { HeaderNav } from 'shared/components/HeaderNav';
import { DateRange } from 'shared/components/DateRange';
import { ReusableHead } from 'shared/components/ReusableHead';
import { ReusableFooter } from 'shared/components/ReusableFooter';

// Styles
import { Section, DateSelect, StyledCol } from 'shared/styles/pages/search'

// Hooks
import { useInitialValuesFromQuery } from  'shared/hooks/useInitialValuesFromQuery';

// Apis & Helpers
import { fetchFlightsSerialized } from 'shared/utils/api/skyscannerViaRapidApi';
import { getAsString } from 'shared/utils/getAsString';



export default function Search({flights, searchIncludesReturn}) {
  const { Header, Content } = Layout;
  
  const initialValues = useInitialValuesFromQuery();

  const { query } = useRouter();

  const [selectedFlights, setFlights] = useState(flights)

  return (
    <>
      <ReusableHead title='Flights.rip | Search results' />

      <Layout>
        <Header>
          <HeaderNav />
        </Header>

        <Content>
          <Section>
          <SearchForm
              initialValues={initialValues}
            />

          <DateSelect>
            { query.departureDate &&
              <Row>
                <StyledCol xs={24} md={4}>
                  Departure:
                </StyledCol>
                <Col flex="auto">
                  <DateRange setFlights={setFlights} />
                </Col>
              </Row>
            }

            { searchIncludesReturn && query.returnDate &&
              <Row>
                <StyledCol xs={24} md={4}>
                  Return:
                </StyledCol>
                <Col flex="auto">
                  <DateRange setFlights={setFlights} isReturn/>
                </Col>                
              </Row>
            }
          </DateSelect>

            <FlightResults
              flights={selectedFlights}
              searchIncludesReturn={searchIncludesReturn}
            />    
          </Section>
        </Content>

        <ReusableFooter />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const origin = getAsString(context.query.origin)
  const destination = getAsString(context.query.destination)
  const departureDate = getAsString(context.query.departureDate)
  const returnDate = getAsString(context.query.returnDate)

  const flights = await fetchFlightsSerialized(origin, destination, departureDate, returnDate)

  return { props: {
    flights: flights,
    searchIncludesReturn: returnDate ? true : false
  } }
}