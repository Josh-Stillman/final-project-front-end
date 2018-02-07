import React from 'react'
import { Table, Header, Icon, Grid, Segment, Button, List, Container, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as helpers from './Helpers'

class HomePage extends React.Component {

  //formatting from other pages.
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  handleClick = () => {
    this.setState({loading: !this.state.loading})
  }


  getNums = () => {

    let myNums = {
      yourRepSpending: "",
      yourDemSpending: "",
      totalRepSpending: "",
      totalDemSpending: ""
    }
    if (this.props.businesses != []) {
      let myOrgs = {
        repOrgs: this.props.businesses.filter(biz => biz.total_rep_pct > .5),
        demOrgs: this.props.businesses.filter(biz => biz.total_dem_pct > .5),
      }


      myNums = {
        yourRepSpending: helpers.floatFormatter.format(myOrgs.repOrgs.reduce((acc, biz) => acc += parseFloat(biz.user_total_spending), 0)),
        yourDemSpending: helpers.floatFormatter.format(myOrgs.demOrgs.reduce((acc, biz) => acc += parseFloat(biz.user_total_spending), 0)),
        totalRepSpending: helpers.intFormatter.format(myOrgs.repOrgs.reduce((acc, biz) => acc += parseInt(biz.total_rep), 0)),
        totalDemSpending: helpers.intFormatter.format(myOrgs.demOrgs.reduce((acc, biz) => acc += parseInt(biz.total_dem), 0))
      }

    }
    return myNums
  }



//   const getNumbers = () =>{
//     myOrgs.repOrgs = props.businesses.filter(biz => biz.total_rep_pct > .5)
//     nums.demOrgs = props.businesses.filter(biz => biz.total_dem_pct > .5)
//     let yourRepSpending = repOrgs.reduce((acc, biz) => acc += biz.user_total_spending)
// user_total_spending
//
// total_dem
//   }

render(){
  console.log("user props", this.props.user);

  let myNums = this.getNums()
  return (
    <React.Fragment >
      <Container>
      <Segment vertical padded >
    <Header as='h1' textAlign="center" style={{fontSize: 70, fontFamily: "Inconsolata, monospace"}} >
      <Header.Content>
        Follow  <span>&#8594;</span>  your  <span>&#8594;</span>  $
      </Header.Content>
    </Header>
  </Segment>

    <Segment vertical>
    <Header as='h1' block attached="top">
      <Icon name='visa' />
      <Header.Content as="h2">
        You've spent {myNums.yourRepSpending} at Republican-leaning businesses.
      </Header.Content>
    </Header>

    <Header as='h1' attached>
      <Icon name='money' />
      <Header.Content as="h2">
        They've given {myNums.totalRepSpending} to Republicans (2016-2018 cycles).
      </Header.Content>
    </Header>

    <br/>

    <Header as="h1" block attached="top">
      <Icon name='amex' size="massive" />
      <Header.Content as='h2'>
        You've spent {myNums.yourDemSpending} at Democrat-leaning businesses.
      </Header.Content>
    </Header>
    <Header as="h1" attached>
      <Icon name='money' size="massive" />
      <Header.Content as='h2'>
        They've given {myNums.totalDemSpending} to Democrats (2016-2018 cycles).
      </Header.Content>
    </Header>
    </Segment>

    <Segment padded="very" vertical>
    <Grid container stackable verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as='h3' style={{ fontSize: '2em' }}>Hello, {this.props.user.name}. You've analyzed {this.props.user.months_analyzed} months of transactions.</Header>
          <p style={{ fontSize: '1.33em' }}>
            That's {this.props.user.total_analyzed_transactions} total analyzed transactions. We found campaign finance data for {this.props.user.number_matched_transactions} of those transactions ({helpers.pctFormatter(parseFloat(this.props.user.percent_matched))}) at {this.props.user.business_count} businesses.
          </p>
          <Header as='h3' style={{ fontSize: '2em' }}>Analyze More Transactions!</Header>
          <p style={{ fontSize: '1.33em' }}>
            There are still {this.props.user.remaining_months_to_analyze} months of loaded data to analyze.  The next month to analyze is {this.props.user.next_month_to_analyze}.
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


    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>"What a Company"</Header>
            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>"I shouldn't have gone with their competitor."</Header>
            <p style={{ fontSize: '1.33em' }}>
              <Icon name="money" size="massive" />
              <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>Breaking The Grid, Grabs Your Attention</Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the art of doing
          nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic
          and worth your attention.
        </p>
        <Button as='a' size='large'>Read More</Button>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>Did We Tell You About Our Bananas?</Header>
        <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but it's really
          true.
          It took years of gene splicing and combinatory DNA research, but our bananas can really dance.
        </p>
        <Button as='a' size='large'>I'm Still Quite Interested</Button>
      </Container>
    </Segment>
    </Container>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
     <Container>
       <Grid divided inverted stackable>
         <Grid.Row>
           <Grid.Column width={3}>
             <Header inverted as='h4' content='About' />
             <List link inverted>
               <List.Item as='a'>Sitemap</List.Item>
               <List.Item as='a'>Contact Us</List.Item>
               <List.Item as='a'>Religious Ceremonies</List.Item>
               <List.Item as='a'>Gazebo Plans</List.Item>
             </List>
           </Grid.Column>
           <Grid.Column width={3}>
             <Header inverted as='h4' content='Services' />
             <List link inverted>
               <List.Item as='a'>Banana Pre-Order</List.Item>
               <List.Item as='a'>DNA FAQ</List.Item>
               <List.Item as='a'>How To Access</List.Item>
               <List.Item as='a'>Favorite X-Men</List.Item>
             </List>
           </Grid.Column>
           <Grid.Column width={7}>
             <Header as='h4' inverted>Footer Header</Header>
             <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
           </Grid.Column>
         </Grid.Row>
       </Grid>
     </Container>
   </Segment>



    </React.Fragment>
  )
}

}

const mapStateToProps = (state) =>{
  return {
    businesses: state.businesses.all,
    column: state.businesses.column,
    direction: state.businesses.direction,
    user: state.user.info
  }
}


export default connect(mapStateToProps, actions)(HomePage)
