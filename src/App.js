import React, { Component } from 'react';
import styled from 'styled-components'
import {Button, Input, DatePicker} from 'antd';
import * as moment from 'moment';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import AppHeader from "./AppHeader";
import ResultList from "./ResultList";

const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
`
const LayoutFrame = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: 100px auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
    //border: 3px solid red;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75);
`

class App extends Component {
  constructor(){
    super();
    this.state = {
      from: 'Barcelona',
      to: 'New York City',
      date: moment(Date.now()).add(1, 'days')
    }
  }
  componentDidCatch(error){
    console.log('Error', error)
    this.setState({...this.state, error})
  }
  handleChange = (k) => (e) => {
    this.setState({...this.state, [k]: e.target.value });
  }
  handleChangeDate = (date) => {
    this.setState({...this.state, date });
  }
  handleSearch = () => {

  }
  render() {
    var { flightSearchQuery } = this.props;
    return (<Container>
        <LayoutFrame>
          <AppHeader handleChange={this.handleChange}
                     handleChangeDate={this.handleChangeDate}
                     handleSearch={this.handleSearch}
                     from={this.state.from}
                     to={this.state.to}
                     date={this.state.date}/>
          {this.state.from && this.state.to && this.state.date &&
          <ResultList from={this.state.from}
                      to={this.state.to}
                      date={this.state.date}/>}
        </LayoutFrame>
      </Container>

    );
  }
}

export default (App);
