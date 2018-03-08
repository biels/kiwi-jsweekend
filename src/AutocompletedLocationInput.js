import React, {Component} from 'react';
import {compose, graphql, Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components'
import {Button, Input, DatePicker, AutoComplete} from 'antd';
import _ from 'lodash'

const LocactionsSearchQuery = gql`
    query LocationsQuery($search: String){
        allLocations(search: $search){
            edges {
                node {
                    locationId
                    name
                    type
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
  constructor() {
    super();
    this.state = {
      dataSource: [],
    }
  }

  handleSearch = (data, refetch) => (value) => {
    if (data == null || data.loading || value.length < 2) {
    } else {
      // console.log("Refetch init")
      // refetch({search: value})
      // console.log("Refetch end")
    }
  }

//this.handleSearch(data.refetch)
  shouldComponentUpdate(nextProps, nextState) {
    if ((nextProps.data || {}).loading !== (this.props.data || {}).loading) return true;
    return false;
  }

  render() {
    console.log("Render")
    let {data, tag, value, handleChange} = this.props
    let {loading, error, allLocations, refetch} = (data || {});
    console.log('data', data)
    //
    let handleSearch1 = this.handleSearch(data, refetch);
    return <Container>

      <AutoComplete
        style={{width: '100%'}}
        dataSource={this.props.dataSource}
        optionLabelProp="value"
        onSearch={handleSearch1}
        onChange={handleChange(tag.toLowerCase())}
        value={value}
      >
        <Input addonBefore={tag}/>
      </AutoComplete>
    </Container>
  }
}

export default graphql(LocactionsSearchQuery, {
  options: ({ value }) => ({ variables: { search: value } }),
  skip: ({value}) => value.length < 2,
  props: ({...props, data}) => ({
    ...props,
    dataSource: (!data.loading ? _.uniq(((data.allLocations || []).edges || []).map(e => e.node.name)) : ['Loading...']) || ['No results']
  }),
})(AutocompletedLocationInput);