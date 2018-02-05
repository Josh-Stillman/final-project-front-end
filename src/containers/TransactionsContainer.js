import React from 'react'
import Transaction from '../components/Transaction'
import { Table, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'



class TransactionsContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      sortedData: this.props ? this.props.transactions : null,
      column: "date",
      direction: "descending"
    }
  }

  handleSort = (clickedColumn) => {
    if (clickedColumn === this.state.column) {
      this.setState({
        direction: this.state.direction === 'ascending' ? 'descending' : 'ascending'
      })
    } else {
      this.setState({
        column: clickedColumn,
        direction: 'descending'
      })
    }
  }

  render() {

    let sorted = []
    if (this.state.direction === "descending") {
      sorted = this.props.transactions.sort((a,b) => b[this.state.column] - a[this.state.column]);
    } else {
      sorted = this.props.transactions.sort((a,b) => a[this.state.column] - b[this.state.column]);
    }
    debugger
    console.log("sorted data", this.state.direction === "descending");

    return (
      <React.Fragment >
      <Header as='h2'>
        <Icon name='dollar' />
        <Header.Content>
          Your Transactions
        </Header.Content>
      </Header>
      <Table celled selectable striped sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='3'><h3>Your Transactions</h3></Table.HeaderCell>
            <Table.HeaderCell colSpan='5'><h3>Campaign Finance Data 2016-2018</h3></Table.HeaderCell>
          </Table.Row>
          <Table.Row >
            <Table.HeaderCell sorted={this.state.column === 'date' ? this.state.direction : null} onClick={() => this.handleSort('date')}>Date</Table.HeaderCell>
            <Table.HeaderCell sorted={this.state.column === 'business' ? this.state.direction : null} onClick={() => this.handleSort('business')}>Business</Table.HeaderCell>
            <Table.HeaderCell sorted={this.state.column === 'amount' ? this.state.direction : null} onClick={() => this.handleSort('amount')}>Amount</Table.HeaderCell>
            <Table.HeaderCell sorted={this.state.column === 'organization' ? this.state.direction : null} onClick={() => this.handleSort('organization')}>Organization</Table.HeaderCell>
            <Table.HeaderCell sorted={this.state.column === 'total_dem' ? this.state.direction : null} onClick={() => this.handleSort('total_dem')}>Total Democrat</Table.HeaderCell>
            <Table.HeaderCell sorted={this.state.column === 'total_rep' ? this.state.direction : null} onClick={() => this.handleSort('total_rep')}>Total Republican</Table.HeaderCell>
            <Table.HeaderCell sorted={this.state.column === 'total_dem_pct' ? this.state.direction : null} onClick={() => this.handleSort('total_dem_pct')}>Percent Democrat</Table.HeaderCell>
            <Table.HeaderCell sorted={this.state.column === 'total_rep_pct' ? this.state.direction : null} onClick={() => this.handleSort('total_rep_pct')}>Percent Republican</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sorted.map(transaction => <Transaction transaction={transaction} />)}
        </Table.Body>
        </Table>
        </React.Fragment>
        )
  }
}

const mapStateToProps = (state) =>{
  return {
    transactions: state.transactions.all
  }
}

export default connect(mapStateToProps, actions)(TransactionsContainer);
