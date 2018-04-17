import React from 'react'
import { Form, Input, Table, Header, Icon, Grid, Segment, Button, List, Container, Divider, Image } from 'semantic-ui-react'
import * as helpers from '../Helpers'
import * as actions from '../actions'
import {connect} from 'react-redux'
import {API_ROOT} from '../api-config'

class HomePageTransactions extends React.Component {

  constructor(){
    super()
    this.state = {
      loading: false
    }
  }

  handleClick = () => {
    //this.setState({loading: !this.state.loading}, () => {
      this.props.toggle_load_transactions()
      fetch(`${API_ROOT}/users/${this.props.userData.id}/load_new_month`)
      .then(res => res.json())
      .then(json=> {console.log("done loading month", json)})
      .then(json => {
        this.props.fetch_user_data(this.props.user.id)
        this.props.fetch_transactions(this.props.user.id)
        this.props.fetch_businesses(this.props.user.id)
        this.props.toggle_load_transactions()})
        //setState({loading: !this.state.loading})})
      }

    loadCSV = (event) => {
      event.persist();
      event.preventDefault();

      let data = new FormData()
      data.append('file', event.target[0].files[0])

      console.log(event.target[0].files[0])
      fetch(`${API_ROOT}/users/${this.props.userData.id}/import_csv`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'text/csv',
        //   Accepts: 'application/json'
        // },
        body: data
      })
      .then(res => res.json())
      .then(json => console.log(json))
      .then(asdf => this.props.fetch_user_data(this.props.userData.id));
    }

    userHasTransactions = () => {
      return (
        <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>Hello, {this.props.userData.name}. You've analyzed {this.props.userData.months_analyzed ? this.props.userData.months_analyzed : "0"} months of transactions.</Header>
            {this.props.userData.months_analyzed ? <p style={{ fontSize: '1.33em' }}>
              That's {this.props.userData.total_analyzed_transactions} total analyzed transactions. We found campaign finance data for {this.props.userData.number_matched_transactions} of those transactions ({helpers.pctFormatter(parseFloat(this.props.userData.percent_matched))}) at {this.props.userData.business_count} businesses.
            </p> : null}
            <Header as='h3' style={{ fontSize: '2em' }}>{this.props.userData.remaining_months_to_analyze > 0 ? "Analyze More Transactions!" : "" }</Header>
            <p style={{ fontSize: '1.33em' }}>
              {this.props.userData.remaining_months_to_analyze > 0 ? `There are still ${this.props.userData.remaining_months_to_analyze} months of loaded data to analyze.  The next month to analyze is ${this.props.userData.next_month_to_analyze}.` : "There are no more months to analyze!"}
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Icon name="credit card alternative" size="massive"/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button size='massive' loading={this.props.loading} disabled={this.props.loading || this.props.userData.remaining_months_to_analyze === 0} onClick={this.handleClick} primary><Icon name='calendar' />{this.props.userData.remaining_months_to_analyze > 0 ? "Analyze another month's transactions" : "No more transaction to analyze." }</Button>
            <p><i>Warning: may take about 5 minutes</i></p>
          </Grid.Column>
          </Grid.Row>
          </Grid>
      )
    }

    userHasNoTransaction = () => {
      return(
      <Grid container stackable verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column width={3}>
        </Grid.Column>
        <Grid.Column width={7}>
          <Header as='h3' style={{ fontSize: '2em' }}>Hello, {this.props.userData.name}.<br/><br/> You haven't uploaded any transactions yet. </Header>
          <p><a href="https://help.mint.com/Accounts-and-Transactions/888960591/How-do-you-export-transaction-data.htm" target="blank">Export a .CSV file from your Mint account</a> and upload it here to get started. </p>
        </Grid.Column>
        <Grid.Column floated='right' width={6}>
          <Icon name="credit card alternative" size="massive"/>
        </Grid.Column>

      </Grid.Row>
      <Grid.Row>
      <Grid.Column textAlign='center'>
        <Container text>
        <Form onSubmit={(event) => this.loadCSV(event)}>
        <Form.Input size="huge" type="file" /> <br/>
        <Button size='massive' primary type="submit"><Icon name='grid layout' />Load CSV of Tranactions from Mint</Button>
        </Form>
        </Container>
      </Grid.Column>
      </Grid.Row>
      </Grid>
    )
    }



  render(){

  return (
    <Segment padded="very" vertical>

    {this.props.userData.oldest_transaction_month ? this.userHasTransactions() : this.userHasNoTransaction()}

  </Segment>
  )
}
}

const mapStateToProps = (state) =>{
  return {
    loading: state.user.loading
  }
}

export default connect(mapStateToProps, actions)(HomePageTransactions)
