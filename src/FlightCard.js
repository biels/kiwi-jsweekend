import React, {Component} from 'react';
import styled from 'styled-components'

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
    const {id, departure, arrival, to, price} = (this.props.flight || {id: 'undefined'});
    return <Container>
      <div>From: {departure.name} ({departure.airport.name})</div>
      <div>To: {arrival.name} ({arrival.airport.name})</div>
      <div>Price: {price.amount}{' '}{price.currency}</div>
    </Container>
  }
}

export default FlightCard;