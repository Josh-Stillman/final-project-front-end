import React from 'react'
import { Flag, Table, Header, Icon, Grid, Segment, Button, List, Container, Divider, Image } from 'semantic-ui-react'

const HomePageInfo = (props) => {


  return (
    <Segment vertical padded="very" size="large">
    <Header as="h1" textAlign="center">
      Helping you uncover the political spending of the businesses you shop at.
    </Header>
    <br/>
      <Container textAlign="center">
       <Icon name='user outline' size="massive"/>
       <Icon name='arrow right' size="massive"/>
        <Icon name='credit card alternative' size="massive"/>
        <Icon name='arrow right' size="massive"/>
        <Icon name='building outline' size="massive"/>
        <Icon name='arrow right' size="massive"/>
        <Icon name='flag' size="massive" />

    </Container>

    </Segment>
  )

}

export default HomePageInfo
