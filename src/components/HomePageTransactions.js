import React from 'react'
import { Table, Header, Icon, Grid, Segment, Button, List, Container, Divider, Image } from 'semantic-ui-react'
import * as helpers from '../Helpers'

class HomePageTransactions extends React.Component {

  constructor(){
    super()
    this.state = {
      loading: false
    }
  }

  handleClick = () => {
    this.setState({loading: !this.state.loading})
  }


  render(){
    console.log("homepage transactions", this.props.userData);
  return (
    <Segment padded="very" vertical>
    <Grid container stackable verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as='h3' style={{ fontSize: '2em' }}>Hello, {this.props.userData.name}. You've analyzed {this.props.userData.months_analyzed ? this.props.userData.months_analyzed : "0"} months of transactions.</Header>
          {this.props.userData.months_analyzed ? <p style={{ fontSize: '1.33em' }}>
            That's {this.props.userData.total_analyzed_transactions} total analyzed transactions. We found campaign finance data for {this.props.userData.number_matched_transactions} of those transactions ({helpers.pctFormatter(parseFloat(this.props.userData.percent_matched))}) at {this.props.userData.business_count} businesses.
          </p> : null}
          <Header as='h3' style={{ fontSize: '2em' }}>Analyze More Transactions!</Header>
          <p style={{ fontSize: '1.33em' }}>
            There are still {this.props.userData.remaining_months_to_analyze} months of loaded data to analyze.  The next month to analyze is {this.props.userData.next_month_to_analyze}.
          </p>
        </Grid.Column>
        <Grid.Column floated='right' width={6}>
          <Icon name="credit card alternative" size="massive"/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Button size='massive' loading={this.state.loading} onClick={this.handleClick} primary><Icon name='calendar' />Analyze another month's transactions</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
  )
}
}

export default HomePageTransactions
