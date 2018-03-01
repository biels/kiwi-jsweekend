import React, {Component} from 'react';
import styled from 'styled-components'

const Container = styled.div`
    grid-auto-flow: column;
    height: 100px;
    width: 300px;
    background-color: wheat;
    > * {
    height: fit-content;
      padding: 2px;
    }
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