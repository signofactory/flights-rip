import styled from 'styled-components';

import { breakpoint } from 'shared/styles';

// Components
import { Radio } from 'antd';
const { Group, Button } = Radio;


export const StyledGroup = styled(Group)`
  width: 100%;
  max-width: 900px;
  display: inline-flex;
`

export const StyledButton = styled(Button)`
  padding: 0;
  flex-grow: 1;
  width: 20%;
  text-align: center;
  height: auto;
  padding: 5px 0;
  font-size: 16px;

  p{
    line-height: 22px;
    margin-bottom: 0;

    &:last-child{
      color: rgba(0, 0, 0, 0.25);
      font-size: 14px;
    }
  }

  &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) p:last-child {
    color: #1890ff;
  }
`

