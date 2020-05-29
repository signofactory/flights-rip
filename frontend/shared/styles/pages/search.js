import styled from 'styled-components';

import { Col } from 'antd';

import { breakpoint } from 'shared/styles';


export const Section = styled.div`
  padding: 50px;
  margin: auto;
  max-width: 1300px;

  @media only screen and (max-width: ${breakpoint.md}){
    padding: 50px 20px;
  }
`

export const DateSelect = styled.div`
  margin: 50px auto;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &>div{
    margin: auto;
    margin-bottom: 25px;
    width: 100%;
    
    &:last-child{
      margin-bottom: 0;
    }
  }

  @media only screen and (max-width: ${breakpoint.md}){
    margin: 30px auto 50px auto;

    &>div{
      margin-bottom: 15px;
    }
  }
`
export const StyledCol = styled(Col)`
  text-align: end;
  padding-right: 10px;
  line-height: 52px;

  @media only screen and (max-width: ${breakpoint.md}){
    text-align: start;
  }
`


