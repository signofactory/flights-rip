import styled from 'styled-components';

import { Card } from 'antd';

import { breakpoint } from 'shared/styles';


export const FlightsContainer = styled.div`
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
`

export const StyledCard = styled(Card)`
  margin-bottom: 24px;

  &:last-child{
    margin-bottom: 0;
  }
`

export const FlightEndpointBase = styled.div`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  background-color: #f5f5f5;
  text-align: center;

  p{
    margin-bottom: 8px;

    &:last-child{
      margin-bottom: 0;
    }
  }

  .airport-title{
    color: rgba(0, 0, 0, 0.85);
    font-size: 24px;
  }
`

export const FlightInfoContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  text-align: center;

  @media only screen and (max-width: ${breakpoint.md}){
    margin: 10px auto;

    p{
      margin-bottom: 0;
    }
  }
`