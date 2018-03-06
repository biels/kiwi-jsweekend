import React, {Component} from 'react';
import styled from 'styled-components'
import {Button, Input, DatePicker, AutoComplete} from 'antd';
import {compose, graphql, Query} from 'react-apollo';
import gql from 'graphql-tag';
import AutocompletedLocationInput from "./AutocompletedLocationInput";


const Container = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    grid-gap: 8px;
    align-items: center;
    background-color: cadetblue;
    padding: 8px;
`
const Title = styled.div`
    display: grid;
    justify-items: center;
    grid-auto-flow: row;
    & > :first-child{
      font-variant: small-caps;
    }
`

class AppHeader extends Component {
  constructor(){
    super();
    this.state = {
      dataSource: []
    }
  }

  render() {
    const {from, to, date, handleChange, handleChangeDate, handleSearch} = this.props
    return <Container>
      <Title>
        <span>kiwi.com</span>
        <span>Flights</span>
      </Title>
      <AutocompletedLocationInput tag={'From'} value={from} handleChange={handleChange}/>

      <Input value={to} addonBefore={'To'} onPressEnter={handleSearch} onChange={handleChange('to')}/>
      <DatePicker showToday value={date} onChange={handleChangeDate} on/>
      <Button type="primary" onClick={handleSearch}>Search</Button>
    </Container>
  }
}

export default AppHeader;