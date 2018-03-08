import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components'
import {AutoComplete, Input} from 'antd';
import _ from 'lodash'

const LocactionsSearchQuery = gql`
    query LocationsQuery($search: String){
        allLocations(search: $search){
            edges {
                node {
                    name
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

  shouldComponentUpdate(nextProps, nextState) {
    if ((nextProps.data || {}).loading !== (this.props.data || {}).loading) return true;
    return false;
  }

  render() {
    let {tag, value, handleChange, dataSource} = this.props
    return <Container>
      <AutoComplete
        style={{width: '100%'}}
        dataSource={dataSource}
        optionLabelProp="value"
        onChange={handleChange(tag.toLowerCase())}
        value={value}
      >
        <Input addonBefore={tag}/>
      </AutoComplete>
    </Container>
  }
}

export default graphql(LocactionsSearchQuery, {
  options: ({value}) => ({variables: {search: value}}),
  skip: ({value}) => value.length < 2,
  props: ({...props, data}) => ({
    ...props,
    dataSource: (!data.loading ? _.uniq(((data.allLocations || []).edges || []).map(e => e.node.name)) : ['Loading...']) || ['No results']
  }),
})(AutocompletedLocationInput);