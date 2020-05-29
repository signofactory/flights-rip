// Components
import { Divider, Row, Col, Button, Typography } from 'antd';
import { SavedSearches } from 'shared/components/SavedSearches';

// Styles
import { FlightsContainer, StyledCard, FlightEndpointBase, FlightInfoContainer } from './Styles'

// Utils
import moment from 'moment'



const { Text } = Typography;


const FlightEndpoint = ({type, code, name}) => {
  return(
    <FlightEndpointBase>
      <p>{type}</p>
      <p className='airport-title'>{code}</p>
      <p>{name}</p>
    </FlightEndpointBase>
  )
}

// Functional component to render the single flight result
const Result = ({flight, searchIncludesReturn}) => {

  return (
    <StyledCard
      title={`$ ${flight.price}`}
    >
      <Row gutter={16, 16}>
        <Col xs={12} md={9}>
          <FlightEndpoint
            type='From'
            code={flight.originCode}
            name={flight.origin}
          />
        </Col>
        <Col xs={12} md={9}>
          <FlightEndpoint
            type='To'
            code={flight.destinationCode}
            name={flight.destination}
          />
        </Col>
        <Col xs={24} md={6}>
          <FlightInfoContainer>
            <Text>{flight.outboundCarrier}</Text>
            <Text type="secondary">{moment(`${flight.departureDate}`).format('ddd, MMM DD')}</Text>
          </FlightInfoContainer>
        </Col>
      </Row>

      { searchIncludesReturn &&
        <>
          <Divider orientation="left" plain>
            Return
          </Divider>
          <Row gutter={16, 16}>
            <Col xs={12} md={9}>
              <FlightEndpoint
                type='From'
                code={flight.inboundOriginCode}
                name={flight.inboundOrigin}
              />
            </Col>
            <Col xs={12} md={9}>
              <FlightEndpoint
                type='To'
                code={flight.inboundDestinationCode}
                name={flight.inboundDestination}
              />
            </Col>
            <Col xs={24} md={6}>
              <FlightInfoContainer>
                <Text>{flight.inboundCarrier}</Text>
                <Text type="secondary">{moment(`${flight.returnDate}`).format('ddd, MMM DD')}</Text>
              </FlightInfoContainer>
            </Col>
          </Row>
        </>
      }
    </StyledCard>
  )
}

// Main export
export function FlightResults({flights, searchIncludesReturn}){
  return (
    <Row gutter={24}>
      <Col xs={0} md={8}>
        <SavedSearches />
      </Col>
      <Col xs={24} md={16}>
        <FlightsContainer>
          {flights && flights.map((flight, index) =>
            <Result
              key={index}
              flight={flight}
              searchIncludesReturn={searchIncludesReturn}
            />
          )}
        </FlightsContainer>
      </Col>
    </Row>
  )
}