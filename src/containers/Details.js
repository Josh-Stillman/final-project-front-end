import React from 'react'
import { Input, Grid, Button, Table, Header, Icon, Segment, Container, Message, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import withAuth from '../hocs/withAuth'
import TransactionWithDescription from '../components/TransactionWithDescription'
import { withRouter } from 'react-router-dom'
import {API_ROOT} from '../api-config'

class Details extends React.Component{

  constructor(){
    super()
    this.state = {
        url: '',
        disabledSubmit: true
        };


  }

  componentWillReceiveProps(){
    this.setState({url: `https://www.opensecrets.org/orgs/summary.php?id=${this.props.business.org_id}`})
  }

  handleChange = event => {
    let submittable = false

    console.log("changing text", !/D\d{9}\b/.test(event.target.value),  !event.target.value.includes(this.props.business.org_id), "this.state.disabled", this.state.disabledSubmit)

    this.setState({
      url: event.target.value,
      disabledSubmit: !/D\d{9}\b/.test(event.target.value) || event.target.value.includes(this.props.business.org_id)
    });
  }

  handleNewBiz = () => {
    // alert(`{old: ${this.props.business.org_id}, new: ${this.state.url.match(/D\d{9}\b/)[0]}}`)

    //alert({old: this.props.business.org_id, new: this.state.url.match(/D\d{9}\b/)[0]})
    //this.props.

    //remove biz from state.

    let payload = {old: this.props.business.org_id, new: this.state.url.match(/D\d{9}\b/)[0]}

        fetch(`${API_ROOT}/users/${this.props.userData.id}/recategorize`,
          {method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(json => {
          this.props.fetch_user_data(this.props.user.id)
          this.props.fetch_transactions(this.props.user.id)
          this.props.fetch_businesses(this.props.user.id)
          this.props.history.push('/businesses')
        })
  }


  handleNoBiz = () => {
    let payload = {old: this.props.business.org_id, new: 1}

        fetch(`${API_ROOT}/users/${this.props.userData.id}/recategorize`,
          {method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(json => {
          this.props.fetch_user_data(this.props.user.id)
          this.props.fetch_transactions(this.props.user.id)
          this.props.fetch_businesses(this.props.user.id)
          this.props.history.push('/')
        })

        }





  render(){

    let floatFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });

    let intFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });

    const pctFormatter = (string) => {
      return Number(string).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0})

    }
    console.log("in details", this.props.business)
    return(
      <Container>
        <Segment padded vertical>
          <Header as='h2'>
            <Icon name='dollar' />
            <Header.Content>
              <Icon name="building outline"/>
              Details for {this.props.business.name}
            </Header.Content>
          </Header>
        </Segment>

        <Table celled striped>
          <Table.Header>
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
      <Table.Row>
        <Table.Cell><a href={`https://www.opensecrets.org/orgs/totals.php?id=${this.props.business.org_id}`} target="blank">{this.props.business.name}</a></Table.Cell>
        <Table.Cell>{intFormatter.format(this.props.business.total_dem)}</Table.Cell>
        <Table.Cell>{intFormatter.format(this.props.business.total_rep)}</Table.Cell>
        <Table.Cell>{pctFormatter(this.props.business.total_dem_pct)}</Table.Cell>
        <Table.Cell>{pctFormatter(this.props.business.total_rep_pct)}</Table.Cell>
        <Table.Cell>{floatFormatter.format(this.props.business.user_total_spending)}</Table.Cell>
    </Table.Row>
    </Table.Body>
    </Table>
    <h3>Related Transactions</h3>
    <Segment style={{height: "150px", overflowY: "scroll"}}>
    <Table celled striped selectable >
    <Table.Header>
      <Table.Row >
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell>Original Transaction Description</Table.HeaderCell>
        <Table.HeaderCell>Amount</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {this.props.transactions.map(transaction => <TransactionWithDescription transaction={transaction} />)}
    </Table.Body>
    </Table>
    </Segment>

    <Segment secondary>
      <Header as="h3">Mismatched transactions?</Header>
        <Grid centered columns={3}>
          <Grid.Row>
            <Grid.Column width={9}>
            <a href="https://www.opensecrets.org/orgs/lookup.php" target="blank"><Button icon labelPosition='right' color="teal">Search for the Correct Business at OpenSecrets.Org<Icon name="search"/></Button></a>
            <br/><br/>
              <p><i>If you find a better match, copy and paste the URL of the organization's OpenSecrets.org page below.</i></p>
              <Input fluid defaultValue={`https://www.opensecrets.org/orgs/summary.php?id=${this.props.business.org_id}`}
              value={this.state.url} onChange={this.handleChange} action={<Button color="blue" onClick={this.handleNewBiz} disabled={true || this.state.disabledSubmit}>Submit New Match</Button>}/>
              <br/><p><i>Temporarily disabled.  Feature coming soon.</i></p>
            </Grid.Column>
            <Grid.Column width={1}>
            <Divider vertical>Or</Divider>
            </Grid.Column>
            <Grid.Column width={6}>

              <Button negative onClick={this.handleNoBiz}>Mark Transactions as Unmatched</Button>
              <br/><br/>
              <p><i>Many businesses, especially smaller businesses, have no campaign finance data available.  Please mark these transactions as unmatched. </i></p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>



    )

  }
}

const mapStateToProps = (state) =>{
  return {
    business: state.details.business,
    transactions: state.transactions.all.filter((t) => t.business.org_id === state.details.business.org_id),
    userData: state.user.info,
    user: state.auth.currentUser,
  }
}

export default connect(mapStateToProps, actions)(withAuth(withRouter(Details)));
