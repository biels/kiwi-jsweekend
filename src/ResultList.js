import React, {Component} from 'react';
import styled from 'styled-components'
import {Button, Input, DatePicker, Spin} from 'antd';
import * as moment from 'moment';
import FlightCard from "./FlightCard";
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const flightSearchQuery = gql`
    query FlightSearch($from: String!, $to: String!, $date: Date!){
        allFlights(search: {
            from: {
                location: $from
            },
            to: {
                location: $to
            },
            date: {
                exact: $date
            }
        }){
            edges{
                node {
                    id
                    price{
                        amount
                        currency
                    }
                    departure {
                        airport{
                            name
                        }
                        time
                    }
                    arrival {
                        airport{
                            name
                        }
                        time
                    }
                }
            }
        }
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 4px;
    justify-content: start;
    overflow: auto;
    height: 80vh;
    > * {
      margin: 2px;
      height: 100px;
    }
`

class ResultList extends Component {
  render() {
    const {loading, error, allFlights} = this.props.data;
    if(loading) return <Spin />
    if(error) return <div>Error {error}</div>
    const resultTags = allFlights.edges
        .map(e => <FlightCard key={e.node.id} flight={e.node}/>)
    return <Container>
      {resultTags}
    </Container>
  }
}
export default
  graphql(flightSearchQuery, {
    options: ({from, to, date}) => ({variables: {from, to, date: date.format("YYYY-MM-DD")}})
  })(ResultList);