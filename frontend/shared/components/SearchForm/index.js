// Next & React
import { useState, useEffect } from 'react'
import Router from 'next/router';

// Components
import { Form, Row, Col, Button, Select, DatePicker, Switch, Space } from 'antd';
const { RangePicker } = DatePicker;

// Styles
import { StyledForm, FormItem } from './Styles';

// Api
import { fetchAirports } from 'shared/utils/api/skyscannerViaRapidApi';
import Api from 'shared/utils/Api';

//Recoil
import { useSetRecoilState } from 'recoil';
import { searchHistoryState } from 'shared/store/recoilState'

// Stuff related to the date
import moment from 'moment';
import { STANDARD_DATE_FORMAT } from 'shared/config/globals';
const dateFormat = STANDARD_DATE_FORMAT;


// Main functional component
export const SearchForm = ({initialValues}) => {
  // Define the initialState for search results arrays and return/one-way selection
  const [data, setData] = useState(undefined)
  const [isReturn, setIsReturn] = useState(true)
  const setSearches = useSetRecoilState(searchHistoryState)

  // Define the form used for the form (needed to get the initial props)
  const [form] = Form.useForm();


  // Define the initial values for the search form (if present)
  useEffect(()=> {
    // If the returnDate is not defined in the initialValues but the departureDate is, then it means it is not a return flight
    !initialValues.rangeDate && initialValues.departureDate && setIsReturn(false)

    form.resetFields()
  }, [initialValues])


  // On Form submission push to search page with the parameters
  const onFinish = (values) => {
    // Define what happens based on retur/one-way choice
    const {rangeDate} = values;
  
    // Set the query
    const query = {
      origin: values.origin,
      destination: values.destination,
      departureDate: isReturn ? rangeDate[0].format(dateFormat) : values.departureDate.format(dateFormat),
      returnDate: isReturn ? rangeDate[1].format(dateFormat) : undefined
    }

    Api.saveSearch(query)

    // Push the user to the updated view setting the right query
    Router.push({
      pathname:'/search',
      query: query
    })

    Api.getUserSearches().then(res => setSearches(res))
  };


  // Set disabled dates for DatePicker
  const disabledDate = current => {
    // Can not select days before today
    return current < moment().startOf('day');
  };


  // Fetch airport list when search is triggered
  const handleSearch = value => {
    if (value) {
      fetchAirports(value).then(airports => {
        setData(airports)
      })
    } else {
      setData(undefined);
    }
  };

  
  return (
    <StyledForm
      name="ticket_search"
      initialValues={{...initialValues, isReturn: isReturn}}
      form={form}
      onFinish={onFinish}
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <FormItem
            name='isReturn'
          >
            <Space align="center">
              <span>One way</span>
              <Switch checked={isReturn} onChange={() => setIsReturn(!isReturn)} />
              <span>Return</span>
            </Space>
          </FormItem>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={6}>
          <FormItem
            rules={[
              {
                required: true,
                message: 'Input something!',
              },
            ]}
            name='origin'
          >
            <Select
              showSearch
              allowClear={true}
              size="large"
              placeholder={'Origin'}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={handleSearch}
              notFoundContent={null}
              style={{width: '100%'}}
            >
              {
                data && data.map(d => {
                  return <Select.Option key={d.PlaceId}>{d.PlaceName}</Select.Option>
                })
              }
            </Select>
          </FormItem>
        </Col>
        
        <Col xs={24} md={12} lg={6}>
          <FormItem
            rules={[
              {
                required: true,
                message: 'Input something!',
              },
            ]}
            name='destination'
          >
            <Select
              showSearch
              size="large"
              placeholder={'Destination'}
              defaultActiveFirstOption={true}
              showArrow={false}
              filterOption={false}
              onSearch={handleSearch}
              notFoundContent={null}
              style={{width: '100%'}}
            >
              {
                data && data.map(d => {
                  return <Select.Option key={d.PlaceId}>{d.PlaceName}</Select.Option>
                })
              }
            </Select>
          </FormItem>
        </Col>
        
        <Col xs={24} md ={24} lg={8}>

          {
            isReturn ?
            <FormItem
              name='rangeDate'
            >
              <RangePicker
                size="large"
                format={dateFormat}
                disabledDate={disabledDate}
                style={{width: '100%'}}
                placeholder={['Departure date', 'Return date']}
              />
            </FormItem>
            :
            <FormItem
              name='departureDate'
            >
              <DatePicker
                size="large"
                format={dateFormat}
                disabledDate={disabledDate}
                style={{width: '100%'}}
                placeholder='Departure date'
              />
            </FormItem>
          }
        </Col>
        
        <Col flex="auto">
          <Button type="primary" size='large' style={{width: '100%'}} htmlType="submit">
            Search
          </Button>
        </Col>
      </Row>
    </StyledForm>
  );
}