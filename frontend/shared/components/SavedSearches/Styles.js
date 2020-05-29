import styled from 'styled-components'

// Components
import { List } from 'antd';
const { Item } = List

export const ListItemStyled = styled(Item)`
  padding: 8px;
  margin: 0 -8px;
  cursor: pointer;
  border-radius: 5px;

  &:hover{
    background-color: #fff;

    .delete-button{
      visibility: visible;
      height: 22px;
      opacity: 1;
    }
  }
`

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .delete-button{
    padding: 0;
    height: 0;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
`