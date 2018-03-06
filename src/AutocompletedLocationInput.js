import React, {Component} from 'react';
import {compose, graphql, Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components'
import {Button, Input, DatePicker, AutoComplete} from 'antd';


const LocactionsSearchQuery = gql`
    query LocationsQuery($search: String){
        allLocations(search: $search){
            edges {
                node {
                    locationId
                }
            }
        }
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

class AutocompletedLocationInput extends Component {
  handleSearch = (loading, refetch) => (value) => {
    if (loading || value.length < 2) {
    }else{
      refetch({search: value})
    }
  }

  render() {
    let {data, tag, value, handleChange} = this.props
    let {loading, error, allLocations} = data;
    console.log('props', this.props)
    return <Container>

      <AutoComplete
        style={{width: '100%'}}
        dataSource={(!loading ? allLocations.edges.map(e => e.node.locationId) : ['Loading...']) || ['No results']}
        optionLabelProp="value"
        onSearch={this.handleSearch(data.refetch)}
        onChange={handleChange(tag.toLowerCase())}
        value={value}
      >
        <Input addonBefore={tag}/>
      </AutoComplete>
    </Container>
  }
}
//TODO Skip if necessary
export default graphql(LocactionsSearchQuery)(AutocompletedLocationInput);