import React, {Component} from 'react';
import styled from 'styled-components'
import moment from "moment";

const Container = styled.div`   
    height: 80px;
    width: 100%;
    margin: 16px;
    background-color: white;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.75);   
    padding: 4px 0px;
`
const GridContainer = styled.div`
    display: grid;
    grid-template-columns: auto 120px;
    height: 100%;
`
const Locations = styled.div`
    padding-left: 12px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    height: 100%;
`
const Price = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 20px;
    font-weight: bold;
`

class FlightCard extends Component {
  render() {
    const {id, departure, arrival, price} = (this.props.flight || {id: 'undefined'});
    let dateFormat = "DD/MM/YYYY hh:mm";
    return <Container>
      <GridContainer>
        <Locations>
          <div>From: <strong>{departure.airport.name}</strong> ({moment(departure.time).format(dateFormat)}) </div>
          <div>To: <strong>{arrival.airport.name}</strong> ({moment(arrival.time).format(dateFormat)}) </div>
        </Locations>
        <Price>{price.amount} {price.currency}</Price>
      </GridContainer>
    </Container>
  }
}

export default FlightCard;