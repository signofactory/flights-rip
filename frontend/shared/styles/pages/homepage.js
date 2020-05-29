import styled from 'styled-components';

import { breakpoint } from 'shared/styles';

export const HomeSearch = styled.div`
  padding: 140px 50px 180px 50px;
  background-image: url('img/home-bg.webp');
  background-size: cover;
  background-position: center;

  @media only screen and (max-width: ${breakpoint.xs}){
    padding: 60px 20px;
  }
`

export const SearchContainer = styled.div`
  margin: auto;
  max-width: 1300px;

  h1{
    font-size: 50px;
  }
`

export const Section = styled.div`
  padding: 100px 50px;
  margin: auto;

  &>h2{
    margin: auto;
    max-width: 1300px;
  }

  @media only screen and (max-width: ${breakpoint.lg}){
    padding: 100px 0;

    &>h2{
      text-align: center;
      padding: 0 50px;
    }
  }

  @media only screen and (max-width: ${breakpoint.xs}){
    padding: 60px 0;

    &>h2{
      padding: 0 20px;
    }
  }
`