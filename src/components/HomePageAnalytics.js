import React from 'react'
import { Table, Header, Icon, Grid, Segment, Button, List, Container, Divider, Image } from 'semantic-ui-react'

const HomePageAnalytics = (props) => {


  return (
    <Segment vertical>
    <Header as='h1' block attached="top">
      <Icon name='visa' />
      <Header.Content as="h2">
        You've spent {props.myNums.yourRepSpending} at Republican-leaning businesses.
      </Header.Content>
    </Header>

    <Header as='h1' attached>
      <Icon name='money' />
      <Header.Content as="h2">
        They've given {props.myNums.totalRepSpending} to Republicans (2016-2018 cycles).
      </Header.Content>
    </Header>

    <br/>

    <Header as="h1" block attached="top">
      <Icon name='amex' size="massive" />
      <Header.Content as='h2'>
        You've spent {props.myNums.yourDemSpending} at Democrat-leaning businesses.
      </Header.Content>
    </Header>
    <Header as="h1" attached>
      <Icon name='money' size="massive" />
      <Header.Content as='h2'>
        They've given {props.myNums.totalDemSpending} to Democrats (2016-2018 cycles).
      </Header.Content>
    </Header>
    </Segment>
  )

}

export default HomePageAnalytics
