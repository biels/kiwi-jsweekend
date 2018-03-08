import React, {Component} from 'react';
import styled from 'styled-components'
import moment from "moment";

const Container = styled.div`
    grid-auto-flow: column;
    height: 100px;
    width: 100%;
    margin: 16px;
    background-color: white;
    > * {
    height: fit-content;
      padding: 2px;
    }
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.75);

`


class FlightCard extends Component {
  render() {
    const {id, departure, arrival, price} = (this.props.flight || {id: 'undefined'});
    let dateFormat = "DD/MM/YYYY hh:mm";
    return <Container>
      <div>From: {departure.airport.name} ({moment(departure.time).format(dateFormat)}) </div>
      <div>To: {arrival.airport.name} ({moment(arrival.time).format(dateFormat)}) </div>
      <div>Price: {price.amount} {price.currency}</div>
    </Container>
  }
}

export default FlightCard;