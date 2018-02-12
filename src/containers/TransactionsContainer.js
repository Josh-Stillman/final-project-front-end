import React from 'react'
import Transaction from '../components/Transaction'
import { Table, Header, Icon, Segment, Container, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import withAuth from '../hocs/withAuth'



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
    if (clickedColumn === this.props.column) {
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

  hasTransactions = () => {
    return(
    <Container>
    <Segment padded vertical>
    <Header as='h2'>
      <Icon name='dollar' />
      <Header.Content>
        <Icon name="credit card alternative"/>
        Your Transactions
      </Header.Content>
    </Header>
  </Segment>
    <Table celled selectable striped sortable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='3'><h3>Your Transactions</h3></Table.HeaderCell>
          <Table.HeaderCell colSpan='5'><h3>Campaign Finance Data 2016-2018</h3></Table.HeaderCell>
        </Table.Row>
        <Table.Row >
          <Table.HeaderCell sorted={this.props.column === 'date' ? this.props.direction : null} onClick={() => this.props.sort_transactions('date')}>Date</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'business' ? this.props.direction : null} onClick={() => this.props.sort_transactions('business')}>Business</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'amount' ? this.props.direction : null} onClick={() => this.props.sort_transactions('amount')}>Amount</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'organization' ? this.props.direction : null} onClick={() => this.props.sort_transactions('organization')}>Organization</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'total_dem' ? this.props.direction : null} onClick={() => this.props.sort_transactions('total_dem')}>Total Democrat</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'total_rep' ? this.props.direction : null} onClick={() => this.props.sort_transactions('total_rep')}>Total Republican</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'total_dem_pct' ? this.props.direction : null} onClick={() => this.props.sort_transactions('total_dem_pct')}>Percent Democrat</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'total_rep_pct' ? this.props.direction : null} onClick={() => this.props.sort_transactions('total_rep_pct')}>Percent Republican</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {this.props.transactions.map(transaction => <Transaction transaction={transaction} />)}
      </Table.Body>
      </Table>
    </Container>)
  }

  noTransactions = () => {
    return (
      <Container>
        <Segment padded basic/>

          <Message warning size="massive">
        <Message.Header><Icon name="credit card alternative"/>You haven't analyzed any transactions yet.</Message.Header>
        <p>Visit Home to analyze your transactions.</p>
      </Message>
    </Container>)

  }

  render() {

    // let sorted = []
    // if (this.state.direction === "descending") {
    //   sorted = this.props.transactions.sort((a,b) => b[this.state.column] - a[this.state.column]);
    // } else {
    //   sorted = this.props.transactions.sort((a,b) => a[this.state.column] - b[this.state.column]);
    // }
    // debugger
    // console.log("sorted data", this.state.direction === "descending");
    console.log("Transactions:", this.props.transactions.length === 0, this.props.transactions);
    return (
      <React.Fragment >
        {this.props.transactions.length !== 0 ? this.hasTransactions() : this.noTransactions()}
        </React.Fragment>

        )
  }
}

const mapStateToProps = (state) =>{
  return {
    transactions: state.transactions.all,
    column: state.transactions.column,
    direction: state.transactions.direction

  }
}

export default connect(mapStateToProps, actions)(withAuth(TransactionsContainer));
