import styled from 'styled-components';

import { breakpoint } from 'shared/styles';

import { Form } from 'antd';
const {Item} = Form;


export const StyledForm = styled(Form)`
  padding: 20px 24px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
`

export const FormItem = styled(Item)`
  margin-bottom: 0;
`