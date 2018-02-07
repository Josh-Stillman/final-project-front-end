import React from 'react'
import Business from '../components/Business'
import { Table, Header, Icon, Segment, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'



class BusinessesContainer extends React.Component {
  constructor() {
    super()
  }

  render() {

    return (
      <React.Fragment >
      <Container>
      <Segment padded vertical>
      <Header as='h2'>
        <Icon name='dollar' />
        <Header.Content>
          <Icon name="building outline"/>
          Business Data
        </Header.Content>
      </Header>
      </Segment>
      <Table celled selectable striped sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='5'><h3>Campaign Finance Data 2016-2018</h3></Table.HeaderCell>
            <Table.HeaderCell colSpan='1'><h3>Your Total Spending</h3></Table.HeaderCell>
          </Table.Row>
          <Table.Row >
            <Table.HeaderCell sorted={this.props.column === 'organization' ? this.props.direction : null} onClick={() => this.props.sort_businesses('organization')}>Organization</Table.HeaderCell>
            <Table.HeaderCell sorted={this.props.column === 'total_dem' ? this.props.direction : null} onClick={() => this.props.sort_businesses('total_dem')}>Total Democrat</Table.HeaderCell>
            <Table.HeaderCell sorted={this.props.column === 'total_rep' ? this.props.direction : null} onClick={() => this.props.sort_businesses('total_rep')}>Total Republican</Table.HeaderCell>
            <Table.HeaderCell sorted={this.props.column === 'total_dem_pct' ? this.props.direction : null} onClick={() => this.props.sort_businesses('total_dem_pct')}>Percent Democrat</Table.HeaderCell>
            <Table.HeaderCell sorted={this.props.column === 'total_rep_pct' ? this.props.direction : null} onClick={() => this.props.sort_businesses('total_rep_pct')}>Percent Republican</Table.HeaderCell>
            <Table.HeaderCell sorted={this.props.column === 'user_total' ? this.props.direction : null} onClick={() => this.props.sort_businesses('user_total')}>Your Total Spending</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.businesses.map(business => <Business business={business} />)}
        </Table.Body>
        </Table>
      </Container>
        </React.Fragment>
        )
  }
}

const mapStateToProps = (state) =>{
  return {
    businesses: state.businesses.all,
    column: state.businesses.column,
    direction: state.businesses.direction

  }
}

export default connect(mapStateToProps, actions)(BusinessesContainer);
